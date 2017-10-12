const expect = require('chai').expect
const { Client } = require('pg');
const request = require('request');
const rp = require('request-promise');
const dummyData = require('../database/dummydata.js');
const db = require('../database/index.js');
const serverURL = 'http://127.0.0.1:1337';

describe ('Restaurant API routes', function() {
  //drops database and recreates a new one with dummy data
  beforeEach(function() {
    return db.Queue.drop()
      .then(() => db.Customer.drop())
      .then(() => db.Restaurant.drop())
      .then(() => db.Restaurant.sync({force: true}))
      .then(() => db.Customer.sync({force: true}))
      .then(() => db.Queue.sync({force: true}))
      .then(() => dummyData.addRestaurants())
      .then(() => dummyData.addCustomers())
      .then(() => dummyData.addToQueue())
      .catch(error => console.log('Error resetting database', error));
  });

  describe ('GET request to /api/restaurants', function() {
    it ('should return a list of restaurants', function(done) {
      rp({
        uri: `${serverURL}/api/restaurants`,
        method: 'GET',
        json: true
      })
      .then((results) => {
        expect(results.length).to.equal(9);
        expect(results[0].name).to.equal('Tempest');
        expect(results[1].status).to.equal('Open');
        expect(results[2].phone).to.equal('(415) 567-7664');
        done();
      });
    });
  });

  describe ('POST request to /api/queues', function() {
    it ('should insert a new row into queues table', function(done) {
      var oldQueueCount;
      db.Queue.count()
      .then((results) => {
        oldQueueCount = results;
        return rp({
          uri: `${serverURL}/api/queues`,
          method: 'POST',
          json: {
            name: 'Example User',
            mobile: '(123) 456-7890',
            email: 'example@email.com',
            size: 2,
            restaurantId: 1
          }
        });
      })
      .then(() => {
        return db.Queue.count()
      })
      .then((results) => {
        var newQueueCount = results;
        expect(newQueueCount).to.be.above(oldQueueCount);
        done();
      });
    });
  });
});
