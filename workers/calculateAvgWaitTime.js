const db = require('../database/index.js')

db.Queue.findAll({ //Find all entries that were dequeued within the last hour in Queues table
  where: {
    // position: null,
    // wait: null,
    updatedAt: {
      [db.Sequelize.Op.gt]: new Date(new Date().getTime() - (1000*60*60))
    }
  }
})
.then((results) => {
  let average_waits = {};//{ restaurant_id: Average wait time per person for the past hour }
  for(let i = 0; i < results.length; i++) {
    average_waits[results[i].dataValues.restaurantId] = average_waits[results[i].dataValues.restaurantId] || [];
    average_waits[results[i].dataValues.restaurantId].
    push((results[i].dataValues.updatedAt - results[i].dataValues.createdAt) / results[i].dataValues.size);
  }
  //Naive implementation: '(updatedAt - createdAt) / size' computes the time spent at the restaurant per peron.
  for(let key in average_waits) {
    average_waits[key] = average_waits[key].reduce((avg, current) => {
      return avg + current / average_waits[key].length;
    }, 0);
  }
  return db.LTWaits.find({
    where: {
      restaurant_id: {
        [db.Sequelize.Op.in]: Object.getOwnPropertyNames(average_waits)
      }
    }
  });
})
.then((results) => {
  let updates = []
  for(let i = 0; i < results.length; i++) {
    results[i].dataValues.wait_avg.push(average_waits[results[i].dataValues.restaurant_id]);
    updates.push(results[i].update({
      wait_avg: results[i].dataValues.wait_avg
    }))
  }
  return Promise.all(updates);
})

// createdAt
// updatedAt
