const db = require('../database/index.js');
const dummyData = require('../database/dummydata.js');
const helpers = require('../helpers/helpers.js');

var averageWaits = {};//{ restaurant_id: Average wait time per person for the past hour }

dummyData.dropDB()
  .then(() => dummyData.addToAndRemoveFromQueue())
  .then(() => {
    return db.Queue.findAll({ //Find all entries that were dequeued within the last hour in Queues table
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
    });
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
            wait: 0,
            month: new Date().getMonth(),
            date: new Date().getDate(),
            hour: new Date().getHours(),
            average_wait: []
          }
<<<<<<< HEAD
        },
        defaults: {
          restaurant_id: key,
          wait: 0,
          month: new Date().getMonth(),
          date: new Date().getDate(),
          hour: new Date().getHours(),
          average_wait: []
        }
      })
    );
    findOrCreates.push(
      db.ShortTerm.findOrCreate({
        where: {
          restaurant_id: {
            [db.Sequelize.Op.eq]: key
          },
          day_in_week: {
            [db.Sequelize.Op.eq]: new Date().getDay()
          },
          hour: {
            [db.Sequelize.Op.eq]: new Date().getHours()
          }
        },
        defaults: {
          restaurant_id: key,
          wait: 0,
          day_in_week: new Date().getDay(),
          hour: new Date().getHours(),
          average_wait: []
        }
      })
    );
  }
  return Promise.all(findOrCreates);
})
.then((results) => {
  let updates = [];
  for(let i = 0; i < results.length; i++) {
    let newAverageWait = results[i][0].average_wait;
    newAverageWait.push(averageWaits[results[i][0].restaurant_id]);
    updates.push(results[i][0].update({
      average_wait: newAverageWait
    }))
  }
  return Promise.all(updates);
})
=======
        })
      );
    }
    return Promise.all(findOrCreates);
  })
  .then((results) => {
    let updates = [];
    for (let i = 0; i < results.length; i++) {
      let newAverageWait = results[i][0].average_wait;
      newAverageWait.push(averageWaits[results[i][0].restaurant_id]);
      updates.push(results[i][0].update({
        average_wait: newAverageWait
      }));
    }
    return Promise.all(updates);
  })
  .then((results) => {
    let predictedWait = [];
    for (let i = 0; i < results.length; i++) {
      let averageWait = results[i].dataValues.average_wait;
      let calculatedWait = helpers.EMACalc(averageWait, averageWait.length);
      predictedWait.push(results[i].update({
        wait: calculatedWait
      }));
    }
    return Promise.all(predictedWait);
  });
>>>>>>> Added predicted wait time for long term table
