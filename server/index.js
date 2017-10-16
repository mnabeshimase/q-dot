const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const port = process.env.PORT || 1337;
const db = require('../database/index.js');
const dbQuery = require('../controller/index.js');
const dbManagerQuery = require('../controller/manager.js');
// const dummyData = require('../database/dummydata.js');
const helpers = require('../helpers/helpers.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('./passport.js');
const redisconfig = process.env.REDIS_URL ? undefined : require('../database/redisconfig.js');
//const accountSid = require('./twilioconfig.js').accountSid;
//const authToken = require('./twilioconfig.js').authToken;
const accountSid = 'AC826953c2c54322a261c5fd413878c775';
const authToken = 'AC826953c2c54322a261c5fd413878c775';
const client = require('twilio')(accountSid, authToken);

/* Import React modules for server rendering */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Customer from '../client/src/components/customer/CustomerApp.jsx';
const customerTemplate = require('../client/dist/customer/index.html.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//checks if session already exists, if it does, adds req.session to req object
app.use(session({
  store: (process.env.REDIS_URL ?
    new RedisStore({
      url: process.env.REDIS_URL
    }) :
    new RedisStore({
      host: redisconfig.host,
      port: redisconfig.port
    })
  ),
  secret: process.env.SESSIONSECRET || 'teambeam',
  cookie: {
    maxAge: 18000000
  },
  resave: false,
  saveUninitialized: false
}));

//these middlewares initialise passport and adds req.user to req object if user has aleady been authenticated
app.use(passport.initialize());
app.use(passport.session());

//this is to check if manager is logged in, before using static middleware. MUST always be above express.static!
app.get('/manager', (req, res, next) => {
  if (req.user) {
    console.log('logged in');
    next();
  } else {
    res.redirect('/managerlogin');
  }
});

app.use(express.static(path.resolve(__dirname, '../client/dist')));

//this shows how you can get queue information from the cookie of a customer who has already queue up
app.use((req, res, next) => {
  if (req.session.queueInfo) {
    console.log(req.session.queueInfo);
  }
  next();
});

app.get('/', (req, res) => {
  if (req.session.queueInfo) {

    res.redirect(`/customer/queueinfo?queueId=${req.session.queueInfo.queueId}`);
  } else {
    res.redirect('/customer');
  }
});

//get info for one restaurant or all restaurants
app.get('/api/restaurants', (req, res) => {
  if (req.query.restaurantId) {
    dbQuery.findInfoForOneRestaurant(req.query.restaurantId)
      .then(results => res.send(results))
      .catch(error => {
        console.log('error getting info for one restaurants', error);
        res.send('failed for one restaurant');
      });
  } else {
    dbQuery.findInfoForAllRestaurants()
      .then(restaurants => res.send(restaurants))
      .catch(error => {
        console.log('error getting info for all restaurants', error);
        res.send('failed for info on all restaurants');
      });
  }
});

app.post('/customersignup', (req, res) => {
  console.log(req.body);
  var params = {};
  var salt = dbQuery.genSalt();
  var password = dbQuery.genPassword(req.body.password, salt);
  params.name = req.body.firstName + ' ' + req.body.lastName;
  params.email = req.body.email;
  params.mobile = req.body.mobile;
  params.passwordHash = password.passwordHash;
  params.salt = password.salt;

  dbQuery.findOrAddCustomerN(params)
    .then((results) => {
      res.end();
    })
    .catch((err) => {
      console.log('err', err);
      res.status(400).send('Bad save');
    });
});

//get info for one restaurant
app.get('/restaurant/:name/:id', (req, res) => {
  dbQuery.findInfoForOneRestaurant(req.params.id)
    .then(results => {
      const context = {};
      const component = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
          <Customer currentRestaurant={results}/>
        </StaticRouter>
      );
      if (context.url) {
        res.redirect(301, context.url);
      } else {
        res.send(customerTemplate({ component: component}));
      }
    })
    .catch(error => {
      console.log('error getting info for one restaurants', error);
      res.end();
    });
});


//drop database and add dummy data
app.post('/dummydata', (req, res) => {
  dummyData.dropDB()
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('error posting dummydata', error);
      res.send('could not add dummydata');
    });
});

//add a customer to the queue at a restaurant
app.post('/api/queues', (req, res) => {
  if (!req.body.name || !req.body.mobile || !req.body.email || !req.body.restaurantId
      || !req.body.size) {
    res.status(400).send('Bad Request');
  } else {
    dbQuery.addToQueue(req.body)
      .then(response => {
        const result = {
          name: helpers.nameFormatter(req.body.name),
          mobile: helpers.phoneNumberFormatter(req.body.mobile)
        };
        if (req.body.email) {
          result.email = req.body.email;
        }
        result.queueId = response.queueId;
        result.size = response.size;
        result.position = response.position;
        result.queueInFrontCount = response.queueCount;
        result.wait = response.wait;
        result.queueInFrontList = response.queueList;
        req.session.queueInfo = result;
        res.send(result);
        //automatically update manager side client
        socketUpdateManager(req.body.restaurantId);
      })
      .catch(err => {
        if (err.message.includes('closed')) {
          res.send(err.message);
        } else if (err.message.includes('added')) {
          res.send(err.message);
        } else {
          console.log('error during post for queue', err);
          res.status(418).send('Request Failed');
        }
      });
  }
});

//update the status of a restaurant
app.patch('/api/restaurants', (req, res) => {
  if (req.query.status && (req.query.status === 'Open' || req.query.status === 'Closed')) {
    dbQuery.updateRestaurantStatus(req.query)
      .then(result => res.send(`Status for restaurant with id ${req.query.restaurantId} is now ${req.query.status}`))
      .catch(err => res.status(418).send('Update for restaurant status failed'));
  } else {
    res.status(400).send('Bad Request');
  }
});

//get queue info
app.get('/queues', (req, res) => {
  if (req.query.queueId) {
    var results = {};
    dbQuery.getCustomerInfo(req.query.queueId)
      .then(partialResults => {
        results.name = partialResults.customer.name;
        results.mobile = partialResults.customer.mobile;
        results.email = partialResults.customer.email;
        results.queueId = partialResults.id;
        results.size = partialResults.size;
        results.position = partialResults.position;
        results.wait = partialResults.wait;
        results.restaurant = partialResults.restaurant;
        return dbQuery.getQueueInfo(partialResults.restaurantId, partialResults.customerId, partialResults.position);
      })
      .then(partialResults => {
        results.queueInFrontCount = partialResults.count;
        results.queueInFrontList = partialResults.rows;
        res.send(results);
      })
      .catch(err => {
        res.status(418).send('Unknown Error - Check customerId');
      });
  } else {
    res.status(400).send('Bad request');
  }
});

//remove customer from queue at a restaurant
app.put('/api/queues', (req, res) => {
  if (!req.query.queueId) {
    res.status(400).send('Bad Request');
  } else {
    dbQuery.removeFromQueue(req.query.queueId)
      .then(result => res.send(result))
      .catch(err => {
        if (err.message.includes('removed')) {
          res.send(err.message);
        } else {
          console.log('error when removing from queue', err);
          res.status(418).send('Request Failed');
        }
      });
  }
});

app.delete('/queues', (req, res) => {

  req.session.destroy(function (err) {
    //res.end();
    dbQuery.removeFromQueue(req.query.queueId)
      .then(result => res.send(result))
      .catch(err => {
        if (err.message.includes('removed')) {
          res.send(err.message);
        } else {
          console.log('error when removing from queue', err);
          res.status(418).send('Request Failed');
        }
      });
  });

});

//login a manager for a restaurant
app.post('/managerlogin', passport.authenticate('local'), (req, res) => {
  dbManagerQuery.addAuditHistory('LOGIN', req.user.id)
    .then(results => res.send('/manager'));
});

//request for logout of manager page of a restaurant
app.get('/logout', (req, res) => {
  dbManagerQuery.addAuditHistory('LOGOUT', req.user.id)
    .then(results => {
      req.logout();
      res.redirect('/managerlogin');
    });
});

//add a new manager login for a restaurant
app.post('/manager', (req, res) => {
  if (req.user) {
    if (!req.query.password || !req.query.username) {
      res.sendStatus(400);
    } else {
      var passwordInfo = dbManagerQuery.genPassword(req.query.password, dbManagerQuery.genSalt());
      dbManagerQuery.addManager(req.query.username, passwordInfo.passwordHash, passwordInfo.salt)
        .then(results => res.send(results));
    }
  } else {
    res.sendStatus(401);
  }
});

//returns manager login/logout history
app.get('/api/manager/history', (req, res) => {
  if (req.user) {
    dbManagerQuery.getAuditHistory().then(results => res.send(results));
  } else {
    res.sendStatus(401);
  }
});

//deletes manager login/logout history
app.delete('/api/manager/history', (req, res) => {
  if (req.user) {
    dbManagerQuery.deleteAuditHistory().then(results => res.send(results));
  } else {
    res.sendStatus(401);
  }
});

//sends sms to customer when table is ready 18019131608
app.post('/sendsms', (req, res) => {

  var restaurantid = req.body.restaurantId;
  var number = req.body.customer.mobile.match(/\d+/g).map(Number).join('');
  var name = req.body.customer.name;
  var restaurant = "";
  var phone = "";

  dbQuery.findInfoForOneRestaurant(restaurantid).then((result)=>{
    restaurant = result.dataValues.name;
    phone = result.dataValues.phone;
  })
  .then(()=>{
    if (number.length === 10) {
      client.messages.create({
          to: `+1${number}`,
          from: "+14159152850",
          body: `Hello ${name}, your reservation at ${restaurant} is now ready! Please contact us at ${phone} if you have any questions.`,
      }, (err, message) => {
        if (err) {
          console.log(err)
          res.end();
        }
        res.end();
      });
    }
  })
  .catch((err) => {
    throw err;
  })

  console.log('CHECK', restaurant, phone)


  res.end();

});

server.listen(port, () => {
  console.log(`(>^.^)> Server now listening on ${port}!`);
});

let queueMap = {};// queueId: socketId
let managerMap = {};// restaurantId: socketId

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`);

  // Send client messages to server
  socket.on('chat message', (message) => {
  // Server broadcasts the message back to the client through the socket connection
    //socket.broadcoast.emit('chat message', message);


    io.sockets.emit('chat message', message);
  });



  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });

  //manager event
  socket.on('manager report', (restaurantId) => {
    console.log(`restaurantId: ${restaurantId} manager reporting with socket id: ${socket.id}`);
    managerMap[restaurantId] = socket.id;
  });

  socket.on('noti customer', (queueId) => {
    if (queueMap[queueId]) {
      io.to(queueMap[queueId]).emit('noti', 'your table is ready!');
    }
  });

  //customer event
  socket.on('customer report', (queueId) => {
    console.log(`queueId: ${queueId} customer reporting with socket id: ${socket.id}`);
    queueMap[queueId] = socket.id;
  });
});

// send message to manager client to update the queue
const socketUpdateManager = (restaurantId) => {
  if (managerMap[restaurantId]) {
    io.to(managerMap[restaurantId]).emit('update', 'queue changed');
  }
};
