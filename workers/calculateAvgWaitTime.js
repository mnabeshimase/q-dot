const db = require('../database/index.js');
const dummyData = require('../database/dummydata.js');
const helpers = require('../helpers/helpers.js');

var averageWaits = {};//{ restaurant_id: Average wait time per person for the past hour }
    db.Queue.findAll({ //Find all entries that were dequeued within the last hour in Queues table
      where: {
        updatedAt: {
          [db.Sequelize.Op.gt]: new Date(new Date().getTime() - (1000 * 60 * 60))
        },
        position: {
          [db.Sequelize.Op.eq]: null
        },
        wait: {
          [db.Sequelize.Op.eq]: null
        }
      }
    })
  .then((results) => {
    for (let i = 0; i < results.length; i++) {
      averageWaits[results[i].dataValues.restaurantId] = averageWaits[results[i].dataValues.restaurantId] || [];
      averageWaits[results[i].dataValues.restaurantId].
        push((results[i].dataValues.updatedAt - results[i].dataValues.createdAt) / results[i].dataValues.size);
    }
    //Naive implementation: '(updatedAt - createdAt) / size' computes the time spent at the restaurant per peron.
    for (let key in averageWaits) {
      averageWaits[key] = averageWaits[key].reduce((avg, current) => {
        return avg + current / averageWaits[key].length;
      }, 0);
    }
    let findOrCreates = [];
    for (let key in averageWaits) {
      findOrCreates.push(
        db.LongTerm.findOrCreate({
          where: {
            restaurant_id: {
              [db.Sequelize.Op.eq]: key
            },
            month: {
              [db.Sequelize.Op.eq]: new Date().getMonth()
            },
            date: {
              [db.Sequelize.Op.eq]: new Date().getDate()
            },
            hour: {
              [db.Sequelize.Op.eq]: new Date().getHours()
            }
          },
          defaults: {
            restaurant_id: key,
            calculated_wait: 0,
            month: new Date().getMonth(),
            date: new Date().getDate(),
            hour: new Date().getHours(),
            average_wait_data: []
          }
        })
      );
      findOrCreates.push(
        db.ShortTerm.findOrCreate({
          where: {
            restaurant_id: {
              [db.Sequelize.Op.eq]: key
            },
            day: {
              [db.Sequelize.Op.eq]: new Date().getDay()
            },
            hour: {
              [db.Sequelize.Op.eq]: new Date().getHours()
            }
          },
          defaults: {
            restaurant_id: key,
            calculated_wait: 0,
            day: new Date().getDay(),
            hour: new Date().getHours(),
            average_wait_data: []
          }
        })
      );
    }
    return Promise.all(findOrCreates);
  })
  .then((results) => {
    let updates = [];
    for (let i = 0; i < results.length; i++) {
      let newAverageWait = results[i][0].average_wait_data;
      newAverageWait.push(averageWaits[results[i][0].restaurant_id]);
      updates.push(results[i][0].update({
        average_wait_data: newAverageWait
      }));
    }
    return Promise.all(updates);
  })
  .then((results) => {
    let predictedWait = [];
    for (let i = 0; i < results.length; i++) {
      let averageWait = results[i].dataValues.average_wait_data;
      let calculatedWait = helpers.EMACalc(averageWait, averageWait.length);
      predictedWait.push(results[i].update({
        calculated_wait: calculatedWait
      }));
    }
    return Promise.all(predictedWait);
  })
  .then((results) => {
    //reformat long term and short term data
    let restData = {};
    results.forEach(term => {
      let dataVal = term.dataValues;
      let restId = term.dataValues.restaurant_id;
      let calcWait = term.dataValues.calculated_wait;
      restData[restId] = restData[restId] || {};

      if (dataVal.day !== undefined) {
        restData[restId].ST = calcWait;
      } else if (dataVal.month !== undefined) {
        restData[restId].LT = calcWait;
      }
    });
    return restData;
  })
  .then(results => {
    //combine short term and long term data
    for (let i in results) {
      let average = (results[i].LT + results[i].ST) / 2;
      results[i] = average;
    }
    return results;
  })
  .then(results => {
    let updates = [];
    for (let id in results) {
      updates.push(
        db.Restaurant.update({
          average_wait: (results[id] / 1000) / 60
        }, {
          where: {
            id: id
          }
        })
      );
    }
    return Promise.all(updates);
  })

