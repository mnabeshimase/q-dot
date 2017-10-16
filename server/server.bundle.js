/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("jquery");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Sequelize = __webpack_require__(32);
var SequelizeConfig = process.env.REDIS_URL ? undefined : __webpack_require__(33);
var db = void 0;

if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL);
} else {
  db = new Sequelize(SequelizeConfig);
}

//Manager Audit History Schema
var ManagerAudit = db.define('manageraudit', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: Sequelize.STRING
});

//Manager Schema
var Manager = db.define('manager', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  passwordHash: Sequelize.STRING,
  passwordSalt: Sequelize.STRING
});

//Customer Schema
var Customer = db.define('customer', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  mobile: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: Sequelize.STRING,
  passwordHash: Sequelize.STRING,
  salt: Sequelize.STRING
});

//Queue Schema
var Queue = db.define('queue', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  size: Sequelize.INTEGER,
  wait: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  position: Sequelize.INTEGER,
  'customer_message': Sequelize.STRING
});

//Restaurant Schema
var Restaurant = db.define('restaurant', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  phone: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  nextPosition: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  'total_wait': {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  'average_wait': {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  status: Sequelize.STRING,
  image: Sequelize.STRING,
  type: Sequelize.STRING,
  menu: Sequelize.STRING
});

var LongTerm = db.define('longterm', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: Sequelize.INTEGER,
  calculated_wait: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  month: Sequelize.INTEGER,
  date: Sequelize.INTEGER,
  hour: Sequelize.INTEGER,
  average_wait_data: Sequelize.ARRAY(Sequelize.INTEGER)
});

var ShortTerm = db.define('shortterm', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  restaurant_id: Sequelize.INTEGER,
  calculated_wait: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  day: Sequelize.INTEGER,
  hour: Sequelize.INTEGER,
  average_wait_data: Sequelize.ARRAY(Sequelize.INTEGER)
});

// Relationship between Restaurant & Queue
Restaurant.hasMany(Queue);
Queue.belongsTo(Restaurant);

//Relationship between Customer & Queue
Customer.hasOne(Queue);
Queue.belongsTo(Customer);

//Relationship between Manager & ManagerAudit
Manager.hasOne(ManagerAudit);
ManagerAudit.belongsTo(Manager);

module.exports = {
  Sequelize: Sequelize,
  db: db,
  Customer: Customer,
  Queue: Queue,
  Restaurant: Restaurant,
  Manager: Manager,
  ManagerAudit: ManagerAudit,
  LongTerm: LongTerm,
  ShortTerm: ShortTerm
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// nav bar
var CustomerNav = function CustomerNav() {
  return _react2.default.createElement(
    "div",
    { className: "customer-nav-bar" },
    _react2.default.createElement(
      "ul",
      { id: "dropdown1", className: "dropdown-content" },
      _react2.default.createElement(
        "li",
        null,
        _react2.default.createElement(
          "a",
          { href: "/" },
          "home"
        )
      ),
      _react2.default.createElement("li", { className: "divider" }),
      _react2.default.createElement(
        "li",
        null,
        _react2.default.createElement(
          "a",
          { href: "/manager" },
          "manager"
        )
      )
    ),
    _react2.default.createElement(
      "nav",
      null,
      _react2.default.createElement(
        "div",
        { className: "nav-wrapper" },
        _react2.default.createElement(
          "ul",
          { className: "nav-mobile hide-on-med-and-down" },
          _react2.default.createElement(
            "li",
            null,
            _react2.default.createElement(
              "a",
              { className: "dropdown-button", href: "#!", "data-activates": "dropdown1" },
              "q.",
              _react2.default.createElement(
                "i",
                { className: "material-icons right" },
                "arrow_drop_down"
              )
            )
          )
        )
      )
    )
  );
};

exports.default = CustomerNav;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _RestaurantLogoBanner = __webpack_require__(17);

var _RestaurantLogoBanner2 = _interopRequireDefault(_RestaurantLogoBanner);

var _CustomerInfoForm = __webpack_require__(18);

var _CustomerInfoForm2 = _interopRequireDefault(_CustomerInfoForm);

var _QueueInfo = __webpack_require__(20);

var _QueueInfo2 = _interopRequireDefault(_QueueInfo);

var _RestaurantInformation = __webpack_require__(23);

var _RestaurantInformation2 = _interopRequireDefault(_RestaurantInformation);

var _reactRouterDom = __webpack_require__(1);

var _axios = __webpack_require__(24);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectedRestaurant = function (_React$Component) {
  _inherits(SelectedRestaurant, _React$Component);

  function SelectedRestaurant(props) {
    _classCallCheck(this, SelectedRestaurant);

    var _this = _possibleConstructorReturn(this, (SelectedRestaurant.__proto__ || Object.getPrototypeOf(SelectedRestaurant)).call(this, props));

    _this.customerInfoSubmitted = _this.customerInfoSubmitted.bind(_this);
    _this.getMenu = _this.getMenu.bind(_this);
    _this.state = {
      currentRestaurant: { queues: [] },
      infoSubmitted: false,
      queueId: 0,
      queuePosition: 0,
      ready: false
    };
    return _this;
  }

  _createClass(SelectedRestaurant, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getRestaurant();
    }
  }, {
    key: 'getRestaurant',
    value: function getRestaurant() {
      var _this2 = this;

      var id = this.props.location.pathname.slice(-1);
      _axios2.default.get('/api/restaurants?restaurantId=' + id).then(function (_ref) {
        var data = _ref.data;

        console.log('successfully grabbed current restaurant data', data);
        _this2.setState({ currentRestaurant: data });
      }, function (error) {
        console.log('failed to grab current restaurant data', error);
      });
    }
  }, {
    key: 'customerInfoSubmitted',
    value: function customerInfoSubmitted(id, position) {
      this.setState({
        infoSubmitted: true,
        queueId: id,
        queuePosition: position
      });
    }
  }, {
    key: 'getMenu',
    value: function getMenu(e) {
      window.open(this.state.currentRestaurant.menu, '_blank');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'selected-restaurant' },
        this.state.currentRestaurant.image ? _react2.default.createElement(_RestaurantLogoBanner2.default, { style: { backgroundImage: 'url(/images/' + this.state.currentRestaurant.image + ')' } }) : undefined,
        _react2.default.createElement(_RestaurantInformation2.default, { restaurant: this.props.currentRestaurant || this.state.currentRestaurant }),
        _react2.default.createElement(_CustomerInfoForm2.default, { customerInfoSubmitted: this.customerInfoSubmitted, getMenu: this.getMenu })
      );
    }
  }]);

  return SelectedRestaurant;
}(_react2.default.Component);

exports.default = SelectedRestaurant;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// nav bar
var CustomerBanner = function CustomerBanner(props) {

  var welcomeMessage = void 0;
  var queueMessage = void 0;
  props.customer ? welcomeMessage = 'Welcome back, ' + props.customer.name + '!' : welcomeMessage = 'Welcome!';
  props.customer ? queueMessage = _react2.default.createElement(
    'p',
    { className: 'restaurant-queued-at' },
    'You are currently queued at ',
    props.customer.restaurant.name.toUpperCase()
  ) : queueMessage = null;

  var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  var d = new Date();

  var curr_date = d.getDate();
  var curr_month = d.getMonth();
  var date_now = curr_date + ' ' + months[curr_month];

  return _react2.default.createElement(
    'div',
    { className: 'gradient-banner-container' },
    _react2.default.createElement(
      'div',
      { className: 'banner-content' },
      _react2.default.createElement(
        'p',
        { className: 'banner-title' },
        welcomeMessage
      ),
      queueMessage
    ),
    _react2.default.createElement(
      'div',
      { className: 'date-container' },
      _react2.default.createElement(
        'p',
        { className: 'date-info' },
        'Today is ',
        date_now
      )
    )
  );
};

exports.default = CustomerBanner;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = __webpack_require__(3);
var _db$Sequelize$Op = db.Sequelize.Op,
    ne = _db$Sequelize$Op.ne,
    lt = _db$Sequelize$Op.lt,
    gt = _db$Sequelize$Op.gt,
    eq = _db$Sequelize$Op.eq;

var helpers = __webpack_require__(8);
var crypto = __webpack_require__(9);

var genSalt = function genSalt() {
  return crypto.randomBytes(16).toString('hex');
};

var genPassword = function genPassword(password, salt) {
  var passwordHash = crypto.createHmac('sha512', salt);
  passwordHash.update(password);
  passwordHash = passwordHash.digest('hex');
  return {
    passwordHash: passwordHash,
    salt: salt
  };
};

//find info for one restaurant with current queue information
var findInfoForOneRestaurant = function findInfoForOneRestaurant(restaurantId) {
  return db.Restaurant.find({
    where: {
      id: restaurantId
    },
    include: [{
      model: db.Queue,
      where: {
        position: _defineProperty({}, ne, null)
      },
      include: [db.Customer],
      required: false
    }]
  });
};

//find info for all restaurants with current queue information
var findInfoForAllRestaurants = function findInfoForAllRestaurants() {
  return db.Restaurant.findAll({
    include: [db.Queue],
    order: [['id', 'ASC']]
  }).then(function (restaurants) {
    restaurants.forEach(function (restaurant) {
      restaurant.dataValues.queues = restaurant.queues.filter(function (row) {
        return row.position !== null;
      });
    });
    return restaurants;
  });
};

//update restaurant open/close status
var updateRestaurantStatus = function updateRestaurantStatus(info) {
  return db.Restaurant.update({ status: info.status }, { where: { id: info.restaurantId } });
};

// find/add customer to database
var findOrAddCustomer = function findOrAddCustomer(params) {
  return db.Customer.findOne({ where: { mobile: params.mobile } }).then(function (customer) {
    if (customer === null) {
      var _customer = {
        name: helpers.nameFormatter(params.name),
        mobile: helpers.phoneNumberFormatter(params.mobile)
      };

      if (params.email) {
        _customer.email = params.email;
      }

      return db.Customer.create(_customer);
    } else {
      return customer;
    }
  });
};

var findOrAddCustomerN = function findOrAddCustomerN(params) {
  return db.Customer.findOne({ where: { mobile: params.mobile } }).then(function (customer) {
    if (customer === null) {
      var _customer2 = {
        name: helpers.nameFormatter(params.name),
        mobile: helpers.phoneNumberFormatter(params.mobile)
      };
      _customer2.passwordHash = params.passwordHash;
      _customer2.salt = params.salt;
      if (params.email) {
        _customer2.email = params.email;
      }

      return db.Customer.create(_customer2);
    } else {
      return customer;
    }
  });
};

// get current queue info for one restaurant
var getQueueInfo = function getQueueInfo(restaurantId, customerId, customerPosition) {
  var _position2;

  return db.Queue.findAndCountAll({
    where: {
      restaurantId: restaurantId,
      position: (_position2 = {}, _defineProperty(_position2, ne, null), _defineProperty(_position2, lt, customerPosition), _position2)
    }
  });
};

//add a customer to a queue at a restaurant
var addToQueue = function addToQueue(params) {
  var queueInfo = {
    size: params.size,
    customer_message: params.customerMessage
  };
  var response = {};

  return findOrAddCustomer(params).then(function (customer) {
    queueInfo.customerId = customer.id;
    queueInfo.name = customer.name;
    return db.Queue.findOne({ where: { customerId: customer.id, restaurantId: params.restaurantId } });
  }).then(function (row) {
    if (row !== null) {
      throw new Error('Already added');
    } else {
      return findInfoForOneRestaurant(params.restaurantId);
    }
  }).then(function (restaurant) {
    if (restaurant.status === 'Open') {
      queueInfo.position = restaurant.nextPosition + 1;
      queueInfo.restaurantId = restaurant.id;
      var totalWait = restaurant.total_wait + restaurant.average_wait;
      queueInfo.wait = restaurant.total_wait === 0 ? 0 : totalWait;
      return db.Restaurant.upsert({ 'nextPosition': queueInfo.position, 'total_wait': totalWait, phone: restaurant.phone });
    } else {
      throw new Error('Restaurant has closed the queue');
    }
  }).then(function (result) {
    return db.Queue.create(queueInfo);
  }).then(function (result) {
    response.wait = result.wait;
    response.queueId = result.id;
    response.size = result.size;
    response.position = result.position;
    return getQueueInfo(result.restaurantId, result.customerId, queueInfo.position);
  }).then(function (result) {
    response.queueList = result.rows;
    response.queueCount = result.count;
    return response;
  });
};

// get queue info for one customer
var getCustomerInfo = function getCustomerInfo(queueId) {
  return db.Queue.findOne({
    where: {
      id: queueId
    },
    include: [db.Customer, db.Restaurant]
  });
};

// get info for one manager
var getManagerInfo = function getManagerInfo(username) {
  return db.Manager.findOne({
    where: {
      username: username
    }
  });
};

//remove customer from queue
var removeFromQueue = function removeFromQueue(queueId) {
  var restaurant = void 0;
  return db.Queue.find({ where: { id: queueId }, include: [db.Restaurant] }).then(function (row) {
    if (!row.position && !row.wait) {
      throw new Error('Already removed');
    } else {
      var _position3;

      restaurant = row.restaurant;
      return db.Queue.findAll({
        where: {
          position: (_position3 = {}, _defineProperty(_position3, ne, null), _defineProperty(_position3, gt, row.position), _position3),
          restaurantId: _defineProperty({}, eq, row.restaurantId)
        }
      });
    }
  }).then(function (results) {
    var promises = [];
    for (var i = 0; i < results.length; i++) {
      promises.push(results[i].update({
        wait: results[i].wait - restaurant.average_wait < 0 ? 0 : results[i].wait - restaurant.average_wait,
        position: results[i].position - 1
      }));
    }
    return Promise.all(promises);
  }).then(function () {
    return db.Restaurant.upsert({ 'total_wait': restaurant.total_wait - restaurant.average_wait < 0 ? 0 : restaurant.total_wait - restaurant.average_wait, phone: restaurant.phone, nextPosition: restaurant.nextPosition - 1 });
  }).then(function () {
    return db.Queue.update({
      position: null,
      wait: null
    }, {
      where: {
        id: _defineProperty({}, eq, queueId)
      }
    });
  }).then(function () {
    return getQueueInfo(restaurant.id, 0, restaurant.nextPosition + 1);
  });
};

module.exports = {
  findInfoForAllRestaurants: findInfoForAllRestaurants,
  findInfoForOneRestaurant: findInfoForOneRestaurant,
  findOrAddCustomer: findOrAddCustomer,
  findOrAddCustomerN: findOrAddCustomerN,
  addToQueue: addToQueue,
  updateRestaurantStatus: updateRestaurantStatus,
  getQueueInfo: getQueueInfo,
  getCustomerInfo: getCustomerInfo,
  getManagerInfo: getManagerInfo,
  removeFromQueue: removeFromQueue,
  genSalt: genSalt,
  genPassword: genPassword
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var request = __webpack_require__(34);

var changeCase = function changeCase(name) {
  return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
};

var nameFormatter = function nameFormatter(name) {
  if (name.includes(' ')) {
    return name.split(' ').map(changeCase).join(' ');
  } else {
    return changeCase(name);
  }
};

var phoneNumberFormatter = function phoneNumberFormatter(number) {
  return number.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
};

var EMACalc = function EMACalc(mArray, mRange) {
  var k = 2 / (mRange + 1);
  // first item is just the same as the first item in the input
  emaArray = [mArray[0]];
  // for the rest of the items, they are computed with the previous one
  for (var i = 1; i < mArray.length; i++) {
    emaArray.push(mArray[i] * k + emaArray[i - 1] * (1 - k));
  }
  return emaArray[emaArray.length - 1];
};

module.exports = {
  nameFormatter: nameFormatter,
  phoneNumberFormatter: phoneNumberFormatter,
  EMACalc: EMACalc
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var crypto = __webpack_require__(9);
var db = __webpack_require__(3);

var genSalt = function genSalt() {
  return crypto.randomBytes(16).toString('hex');
};

var genPassword = function genPassword(password, salt) {
  var passwordHash = crypto.createHmac('sha512', salt);
  passwordHash.update(password);
  passwordHash = passwordHash.digest('hex');
  return {
    salt: salt,
    passwordHash: passwordHash
  };
};

var addManager = function addManager(username, passwordHash, passwordSalt) {
  return db.Manager.findOrCreate({
    where: {
      username: username,
      passwordHash: passwordHash,
      passwordSalt: passwordSalt
    }
  });
};

var addAuditHistory = function addAuditHistory(type, managerId) {
  return db.ManagerAudit.create({
    type: type,
    managerId: managerId
  });
};

var getAuditHistory = function getAuditHistory() {
  return db.ManagerAudit.findAll({
    include: [{
      model: db.Manager,
      attributes: ['username'],
      required: false
    }]
  });
};

var deleteAuditHistory = function deleteAuditHistory() {
  return db.ManagerAudit.drop().then(function () {
    return db.ManagerAudit.sync({ force: true });
  });
};

module.exports = {
  genSalt: genSalt,
  genPassword: genPassword,
  addManager: addManager,
  addAuditHistory: addAuditHistory,
  getAuditHistory: getAuditHistory,
  deleteAuditHistory: deleteAuditHistory
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(12);

var _server2 = _interopRequireDefault(_server);

var _reactRouter = __webpack_require__(13);

var _CustomerApp = __webpack_require__(14);

var _CustomerApp2 = _interopRequireDefault(_CustomerApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = __webpack_require__(28);
var app = express();
var server = __webpack_require__(29).Server(app);
var io = __webpack_require__(30)(server);
var path = __webpack_require__(31);
var port = process.env.PORT || 1337;
var db = __webpack_require__(3);
var dbQuery = __webpack_require__(7);
var dbManagerQuery = __webpack_require__(10);
// const dummyData = require('../database/dummydata.js');
var helpers = __webpack_require__(8);
var bodyParser = __webpack_require__(35);
var session = __webpack_require__(36);
var RedisStore = __webpack_require__(37)(session);
var passport = __webpack_require__(38);
var redisconfig = process.env.REDIS_URL ? undefined : __webpack_require__(41);

/* Import React modules for server rendering */

var customerTemplate = __webpack_require__(42);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//checks if session already exists, if it does, adds req.session to req object
app.use(session({
  store: process.env.REDIS_URL ? new RedisStore({
    url: process.env.REDIS_URL
  }) : new RedisStore({
    host: redisconfig.host,
    port: redisconfig.port
  }),
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
app.get('/manager', function (req, res, next) {
  if (req.user) {
    console.log('logged in');
    next();
  } else {
    res.redirect('/managerlogin');
  }
});

app.use(express.static(path.resolve(__dirname, '../client/dist')));

//this shows how you can get queue information from the cookie of a customer who has already queue up
app.use(function (req, res, next) {
  if (req.session.queueInfo) {
    console.log(req.session.queueInfo);
  }
  next();
});

app.get('/', function (req, res) {
  if (req.session.queueInfo) {

    res.redirect('/customer/queueinfo?queueId=' + req.session.queueInfo.queueId);
  } else {
    res.redirect('/customer');
  }
});

//get info for one restaurant or all restaurants
app.get('/api/restaurants', function (req, res) {
  if (req.query.restaurantId) {
    dbQuery.findInfoForOneRestaurant(req.query.restaurantId).then(function (results) {
      return res.send(results);
    }).catch(function (error) {
      console.log('error getting info for one restaurants', error);
      res.send('failed for one restaurant');
    });
  } else {
    dbQuery.findInfoForAllRestaurants().then(function (restaurants) {
      return res.send(restaurants);
    }).catch(function (error) {
      console.log('error getting info for all restaurants', error);
      res.send('failed for info on all restaurants');
    });
  }
});

app.post('/customersignup', function (req, res) {
  console.log(req.body);
  var params = {};
  var salt = dbQuery.genSalt();
  var password = dbQuery.genPassword(req.body.password, salt);
  params.name = req.body.firstName + ' ' + req.body.lastName;
  params.email = req.body.email;
  params.mobile = req.body.mobile;
  params.passwordHash = password.passwordHash;
  params.salt = password.salt;

  dbQuery.findOrAddCustomerN(params).then(function (results) {
    res.end();
  }).catch(function (err) {
    console.log('err', err);
    res.status(400).send('Bad save');
  });
});

//get info for one restaurant
app.get('/restaurant/:name/:id', function (req, res) {
  dbQuery.findInfoForOneRestaurant(req.params.id).then(function (results) {
    var context = {};
    var component = _server2.default.renderToString(_react2.default.createElement(
      _reactRouter.StaticRouter,
      { location: req.url, context: context },
      _react2.default.createElement(_CustomerApp2.default, { currentRestaurant: results })
    ));
    if (context.url) {
      res.redirect(301, context.url);
    } else {
      res.send(customerTemplate({ component: component }));
    }
  }).catch(function (error) {
    console.log('error getting info for one restaurants', error);
    res.end();
  });
});

//drop database and add dummy data
app.post('/dummydata', function (req, res) {
  dummyData.dropDB().then(function () {
    res.sendStatus(200);
  }).catch(function (error) {
    console.log('error posting dummydata', error);
    res.send('could not add dummydata');
  });
});

//add a customer to the queue at a restaurant
app.post('/api/queues', function (req, res) {
  if (!req.body.name || !req.body.mobile || !req.body.email || !req.body.restaurantId || !req.body.size) {
    res.status(400).send('Bad Request');
  } else {
    dbQuery.addToQueue(req.body).then(function (response) {
      var result = {
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
    }).catch(function (err) {
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
app.patch('/api/restaurants', function (req, res) {
  if (req.query.status && (req.query.status === 'Open' || req.query.status === 'Closed')) {
    dbQuery.updateRestaurantStatus(req.query).then(function (result) {
      return res.send('Status for restaurant with id ' + req.query.restaurantId + ' is now ' + req.query.status);
    }).catch(function (err) {
      return res.status(418).send('Update for restaurant status failed');
    });
  } else {
    res.status(400).send('Bad Request');
  }
});

//get queue info
app.get('/queues', function (req, res) {
  if (req.query.queueId) {
    var results = {};
    dbQuery.getCustomerInfo(req.query.queueId).then(function (partialResults) {
      results.name = partialResults.customer.name;
      results.mobile = partialResults.customer.mobile;
      results.email = partialResults.customer.email;
      results.queueId = partialResults.id;
      results.size = partialResults.size;
      results.position = partialResults.position;
      results.wait = partialResults.wait;
      results.restaurant = partialResults.restaurant;
      return dbQuery.getQueueInfo(partialResults.restaurantId, partialResults.customerId, partialResults.position);
    }).then(function (partialResults) {
      results.queueInFrontCount = partialResults.count;
      results.queueInFrontList = partialResults.rows;
      res.send(results);
    }).catch(function (err) {
      res.status(418).send('Unknown Error - Check customerId');
    });
  } else {
    res.status(400).send('Bad request');
  }
});

//remove customer from queue at a restaurant
app.put('/api/queues', function (req, res) {
  if (!req.query.queueId) {
    res.status(400).send('Bad Request');
  } else {
    dbQuery.removeFromQueue(req.query.queueId).then(function (result) {
      return res.send(result);
    }).catch(function (err) {
      if (err.message.includes('removed')) {
        res.send(err.message);
      } else {
        console.log('error when removing from queue', err);
        res.status(418).send('Request Failed');
      }
    });
  }
});

app.delete('/queues', function (req, res) {

  req.session.destroy(function (err) {
    //res.end();
    dbQuery.removeFromQueue(req.query.queueId).then(function (result) {
      return res.send(result);
    }).catch(function (err) {
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
app.post('/managerlogin', passport.authenticate('local'), function (req, res) {
  dbManagerQuery.addAuditHistory('LOGIN', req.user.id).then(function (results) {
    return res.send('/manager');
  });
});

//request for logout of manager page of a restaurant
app.get('/logout', function (req, res) {
  dbManagerQuery.addAuditHistory('LOGOUT', req.user.id).then(function (results) {
    req.logout();
    res.redirect('/managerlogin');
  });
});

//add a new manager login for a restaurant
app.post('/manager', function (req, res) {
  if (req.user) {
    if (!req.query.password || !req.query.username) {
      res.sendStatus(400);
    } else {
      var passwordInfo = dbManagerQuery.genPassword(req.query.password, dbManagerQuery.genSalt());
      dbManagerQuery.addManager(req.query.username, passwordInfo.passwordHash, passwordInfo.salt).then(function (results) {
        return res.send(results);
      });
    }
  } else {
    res.sendStatus(401);
  }
});

//returns manager login/logout history
app.get('/api/manager/history', function (req, res) {
  if (req.user) {
    dbManagerQuery.getAuditHistory().then(function (results) {
      return res.send(results);
    });
  } else {
    res.sendStatus(401);
  }
});

//deletes manager login/logout history
app.delete('/api/manager/history', function (req, res) {
  if (req.user) {
    dbManagerQuery.deleteAuditHistory().then(function (results) {
      return res.send(results);
    });
  } else {
    res.sendStatus(401);
  }
});

server.listen(port, function () {
  console.log('(>^.^)> Server now listening on ' + port + '!');
});

var queueMap = {}; // queueId: socketId
var managerMap = {}; // restaurantId: socketId

io.on('connection', function (socket) {
  console.log(socket.id + ' connected');

  // Send client messages to server
  socket.on('chat message', function (message) {
    // Server broadcasts the message back to the client through the socket connection
    //socket.broadcoast.emit('chat message', message);


    io.sockets.emit('chat message', message);
  });

  socket.on('disconnect', function () {
    console.log(socket.id + ' disconnected');
  });

  //manager event
  socket.on('manager report', function (restaurantId) {
    console.log('restaurantId: ' + restaurantId + ' manager reporting with socket id: ' + socket.id);
    managerMap[restaurantId] = socket.id;
  });

  socket.on('noti customer', function (queueId) {
    if (queueMap[queueId]) {
      io.to(queueMap[queueId]).emit('noti', 'your table is ready!');
    }
  });

  //customer event
  socket.on('customer report', function (queueId) {
    console.log('queueId: ' + queueId + ' customer reporting with socket id: ' + socket.id);
    queueMap[queueId] = socket.id;
  });
});

// send message to manager client to update the queue
var socketUpdateManager = function socketUpdateManager(restaurantId) {
  if (managerMap[restaurantId]) {
    io.to(managerMap[restaurantId]).emit('update', 'queue changed');
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _CustomerNav = __webpack_require__(4);

var _CustomerNav2 = _interopRequireDefault(_CustomerNav);

var _CustomerMain = __webpack_require__(15);

var _CustomerMain2 = _interopRequireDefault(_CustomerMain);

var _CustomerSignUp = __webpack_require__(26);

var _CustomerSignUp2 = _interopRequireDefault(_CustomerSignUp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// render the big components here
var CustomerApp = function (_React$Component) {
  _inherits(CustomerApp, _React$Component);

  function CustomerApp(props) {
    _classCallCheck(this, CustomerApp);

    return _possibleConstructorReturn(this, (CustomerApp.__proto__ || Object.getPrototypeOf(CustomerApp)).call(this, props));
  }

  _createClass(CustomerApp, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_CustomerNav2.default, null),
        _react2.default.createElement(_CustomerMain2.default, { currentRestaurant: this.props.currentRestaurant })
      );
    }
  }]);

  return CustomerApp;
}(_react2.default.Component);

exports.default = CustomerApp;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _CustomerHome = __webpack_require__(16);

var _CustomerHome2 = _interopRequireDefault(_CustomerHome);

var _SelectedRestaurant = __webpack_require__(5);

var _SelectedRestaurant2 = _interopRequireDefault(_SelectedRestaurant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// main component that will switch components on render via routes
var CustomerMain = function (_React$Component) {
  _inherits(CustomerMain, _React$Component);

  function CustomerMain(props) {
    _classCallCheck(this, CustomerMain);

    return _possibleConstructorReturn(this, (CustomerMain.__proto__ || Object.getPrototypeOf(CustomerMain)).call(this, props));
  }

  _createClass(CustomerMain, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'main',
        null,
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/customer', component: _CustomerHome2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/restaurant', render: function render(props) {
              return _react2.default.createElement(_SelectedRestaurant2.default, _extends({ currentRestaurant: _this2.props.currentRestaurant }, props));
            } })
        )
      );
    }
  }]);

  return CustomerMain;
}(_react2.default.Component);

exports.default = CustomerMain;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _CustomerNav = __webpack_require__(4);

var _CustomerNav2 = _interopRequireDefault(_CustomerNav);

var _CustomerBanner = __webpack_require__(6);

var _CustomerBanner2 = _interopRequireDefault(_CustomerBanner);

var _SelectedRestaurant = __webpack_require__(5);

var _SelectedRestaurant2 = _interopRequireDefault(_SelectedRestaurant);

var _RestaurantCard = __webpack_require__(25);

var _RestaurantCard2 = _interopRequireDefault(_RestaurantCard);

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

var _reactRouterDom = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomerHome = function (_React$Component) {
  _inherits(CustomerHome, _React$Component);

  function CustomerHome(props) {
    _classCallCheck(this, CustomerHome);

    var _this = _possibleConstructorReturn(this, (CustomerHome.__proto__ || Object.getPrototypeOf(CustomerHome)).call(this, props));

    _this.state = {
      selectRestaurant: false,
      currentRestaurant: {},
      restaurantList: [],
      searchText: ''
    };
    _this.filterRestaurants = _this.filterRestaurants.bind(_this);
    return _this;
  }

  _createClass(CustomerHome, [{
    key: 'filterRestaurants',
    value: function filterRestaurants(e) {
      this.setState({ searchText: e.target.value });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getRestaurantList();
    }
  }, {
    key: 'getRestaurantList',
    value: function getRestaurantList() {
      var _this2 = this;

      _jquery2.default.ajax({
        method: 'GET',
        url: '/api/restaurants',
        success: function success(data) {
          console.log('successfully grabbed restaurant data', data);
          _this2.setState({ restaurantList: data });
        },
        failure: function failure(error) {
          console.log('failed to grab restaurant data', error);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var filteredRestaurants = this.state.restaurantList.filter(function (restaurant) {
        return restaurant.type.toLowerCase().indexOf(_this3.state.searchText.toLowerCase()) !== -1;
      });

      return _react2.default.createElement(
        'div',
        { className: 'customer-home' },
        _react2.default.createElement(_CustomerBanner2.default, null),
        _react2.default.createElement(
          'form',
          { className: 'container' },
          _react2.default.createElement('input', { placeholder: 'Enter Restaurants Preferences', text: 'search preference', type: 'text', onChange: this.filterRestaurants })
        ),
        _react2.default.createElement(
          'div',
          { className: 'select-restaurant-container' },
          _react2.default.createElement(
            'h4',
            null,
            'Help me queue up at...'
          ),
          filteredRestaurants.map(function (restaurant) {
            return _react2.default.createElement(
              'div',
              { key: restaurant.id },
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/restaurant/' + restaurant.name + '/' + restaurant.id },
                _react2.default.createElement(_RestaurantCard2.default, { restaurant: restaurant })
              )
            );
          })
        )
      );
    }
  }]);

  return CustomerHome;
}(_react2.default.Component);

exports.default = CustomerHome;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RestaurantLogoBanner = function RestaurantLogoBanner(props) {
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      { className: "restaurant-banner" },
      _react2.default.createElement("div", { className: "restaurant-img-banner", style: props.style })
    )
  );
};

exports.default = RestaurantLogoBanner;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

var _GroupSizeSelector = __webpack_require__(19);

var _GroupSizeSelector2 = _interopRequireDefault(_GroupSizeSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// the form where customers submit their information
var CustomerInfoForm = function (_React$Component) {
  _inherits(CustomerInfoForm, _React$Component);

  function CustomerInfoForm(props) {
    _classCallCheck(this, CustomerInfoForm);

    var _this = _possibleConstructorReturn(this, (CustomerInfoForm.__proto__ || Object.getPrototypeOf(CustomerInfoForm)).call(this, props));

    _this.getGroupSize = _this.getGroupSize.bind(_this);
    _this.getFirstName = _this.getFirstName.bind(_this);
    _this.getLastName = _this.getLastName.bind(_this);
    _this.getMobile = _this.getMobile.bind(_this);
    _this.getEmail = _this.getEmail.bind(_this);
    _this.getCustomerMessage = _this.getCustomerMessage.bind(_this);
    _this.submitCustomerInfo = _this.submitCustomerInfo.bind(_this);
    _this.state = {
      groupSize: 0,
      customerFirstName: '',
      customerLastName: '',
      customerMobile: '',
      customerEmail: '',
      customerMessage: '',
      currentRestaurantId: _this.props.currentRestaurantId
    };
    return _this;
  }

  _createClass(CustomerInfoForm, [{
    key: 'getGroupSize',
    value: function getGroupSize(size) {
      this.setState({
        groupSize: size
      });
    }
  }, {
    key: 'getFirstName',
    value: function getFirstName(event) {
      this.setState({
        customerFirstName: event.target.value
      });
    }
  }, {
    key: 'getLastName',
    value: function getLastName(event) {
      this.setState({
        customerLastName: event.target.value
      });
    }
  }, {
    key: 'getFullName',
    value: function getFullName() {
      var fullName = this.state.customerFirstName + ' ' + this.state.customerLastName;
      this.setState({
        customerFullName: fullName
      });
    }
  }, {
    key: 'getMobile',
    value: function getMobile(event) {
      this.setState({
        customerMobile: event.target.value
      });
    }
  }, {
    key: 'getEmail',
    value: function getEmail(event) {
      this.setState({
        customerEmail: event.target.value
      });
    }
  }, {
    key: 'getCustomerMessage',
    value: function getCustomerMessage(event) {
      this.setState({
        customerMessage: event.target.value
      });
    }
  }, {
    key: 'submitCustomerInfo',
    value: function submitCustomerInfo() {
      var _this2 = this;

      var fullName = this.state.customerFirstName + ' ' + this.state.customerLastName;
      var windowUrl = window.location.href;
      var id = windowUrl.slice(-1);

      _jquery2.default.ajax({
        method: 'POST',
        url: '/api/queues',
        data: JSON.stringify({
          name: fullName,
          mobile: this.state.customerMobile,
          email: this.state.customerEmail,
          customerMessage: this.state.customerMessage,
          size: this.state.groupSize,
          restaurantId: id
        }),
        contentType: 'application/json',
        success: function success(data) {
          console.log('this was a successful post request', data);
          _this2.props.customerInfoSubmitted(data.queueId, data.position);
          window.location.replace('/customer/queueinfo?queueId=' + data.queueId);
        },
        failure: function failure(error) {
          console.log('something went wrong with the post request', error);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'customer-info-input container' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(_GroupSizeSelector2.default, { getGroupSize: this.getGroupSize }),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'input-field col s6' },
              _react2.default.createElement('input', { id: 'first_name', type: 'text', className: 'validate', onChange: this.getFirstName, required: true }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'first_name' },
                'First Name'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'input-field col s6' },
              _react2.default.createElement('input', { id: 'last_name', type: 'text', className: 'validate', onChange: this.getLastName, required: true }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'last_name' },
                'Last Name'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'input-field col s12' },
              _react2.default.createElement('input', { id: 'telephone', type: 'tel', className: 'validate', onChange: this.getMobile, required: true }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'telephone' },
                'Phone Number'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'input-field col s12' },
              _react2.default.createElement('input', { id: 'email', type: 'email', className: 'validate', onChange: this.getEmail }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'email' },
                'Email'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'input-field col s12' },
              _react2.default.createElement('textarea', { id: 'message', className: 'materialize-textarea', 'data-length': '250', onChange: this.getCustomerMessage }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'message' },
                'Add a special request (optional)'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col xs2' },
              _react2.default.createElement(
                'a',
                { className: 'waves-effect waves-light btn', type: 'submit', onClick: this.submitCustomerInfo },
                'Add to Queue'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col xs2' },
              _react2.default.createElement(
                'a',
                { className: 'waves-effect waves-light btn', onClick: this.props.getMenu },
                'Menu'
              )
            )
          )
        )
      );
    }
  }]);

  return CustomerInfoForm;
}(_react2.default.Component);

exports.default = CustomerInfoForm;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroupSizeSelector = function (_React$Component) {
  _inherits(GroupSizeSelector, _React$Component);

  function GroupSizeSelector(props) {
    _classCallCheck(this, GroupSizeSelector);

    var _this = _possibleConstructorReturn(this, (GroupSizeSelector.__proto__ || Object.getPrototypeOf(GroupSizeSelector)).call(this, props));

    _this.getGroupSize = _this.getGroupSize.bind(_this);
    _this.state = {
      currentGroupSize: 'Select your group size'
    };
    return _this;
  }

  _createClass(GroupSizeSelector, [{
    key: 'getGroupSize',
    value: function getGroupSize(event) {
      var size = parseInt(event.target.value);

      this.setState({
        currentGroupSize: size
      });

      this.props.getGroupSize(size);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'customer-group-selector-container' },
        _react2.default.createElement(
          'div',
          { className: 'select-wrapper' },
          _react2.default.createElement(
            'select',
            { className: 'browser-default', value: this.state.currentGroupSize, onChange: this.getGroupSize, required: true },
            _react2.default.createElement(
              'option',
              { value: 'Select your group size', disabled: true },
              'Select group size'
            ),
            _react2.default.createElement(
              'option',
              { value: '1' },
              '1'
            ),
            _react2.default.createElement(
              'option',
              { value: '2' },
              '2'
            ),
            _react2.default.createElement(
              'option',
              { value: '3' },
              '3'
            ),
            _react2.default.createElement(
              'option',
              { value: '4' },
              '4'
            ),
            _react2.default.createElement(
              'option',
              { value: '5' },
              '5'
            ),
            _react2.default.createElement(
              'option',
              { value: '6' },
              '6'
            ),
            _react2.default.createElement(
              'option',
              { value: '7' },
              '7'
            )
          )
        )
      );
    }
  }]);

  return GroupSizeSelector;
}(_react2.default.Component);

exports.default = GroupSizeSelector;
// <div className="customer-group-buttons">
// <a className="waves-effect waves-light btn-large"><i className="material-icons left">person</i>solo</a>
// <a className="waves-effect waves-light btn-large"><i className="material-icons left">people</i>2</a>
// <a className="waves-effect waves-light btn-large"><i className="material-icons left">people</i>3 - 4</a>
// <a className="waves-effect waves-light btn-large"><i className="material-icons left">person_add</i>5 +</a>

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _CustomerNav = __webpack_require__(4);

var _CustomerNav2 = _interopRequireDefault(_CustomerNav);

var _CustomerBanner = __webpack_require__(6);

var _CustomerBanner2 = _interopRequireDefault(_CustomerBanner);

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

var _socket = __webpack_require__(21);

var _socket2 = _interopRequireDefault(_socket);

var _reactModal = __webpack_require__(22);

var _reactModal2 = _interopRequireDefault(_reactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(204, 204, 204, 0.75)'
  },
  content: {
    position: 'absolute',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'scroll',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    margin: '0 auto'
  }
};

var QueueInfo = function (_React$Component) {
  _inherits(QueueInfo, _React$Component);

  function QueueInfo(props) {
    _classCallCheck(this, QueueInfo);

    var _this = _possibleConstructorReturn(this, (QueueInfo.__proto__ || Object.getPrototypeOf(QueueInfo)).call(this, props));

    _this.state = {
      currentCustomer: {
        restaurant: {
          name: ''
        }
      },
      ready: false,
      messages: [],
      input: '',
      modalIsOpen: false
    };
    // socket initialize
    _this.socket = (0, _socket2.default)();
    // dynamically update if table is ready
    _this.socket.on('noti', function (message) {
      console.log(message);
      _this.setState({ ready: true });
    });

    _this.socket.on('chat message', function (message) {

      var oldMessages = _this.state.messages;
      _this.setState({ messages: oldMessages.concat(message) });
    });

    _this.handleOnSubmit = _this.handleOnSubmit.bind(_this);
    _this.handleOnChange = _this.handleOnChange.bind(_this);
    _this.removeFromQueue = _this.removeFromQueue.bind(_this);
    _this.openModal = _this.openModal.bind(_this);
    _this.hideModal = _this.hideModal.bind(_this);
    return _this;
  }

  _createClass(QueueInfo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getCurrentCustomerId();
    }
  }, {
    key: 'openModal',
    value: function openModal() {
      this.setState({
        modalIsOpen: !this.state.modalIsOpen
      });
    }
  }, {
    key: 'hideModal',
    value: function hideModal() {
      this.setState({
        modalIsOpen: false
      });
    }
  }, {
    key: 'handleOnChange',
    value: function handleOnChange(ev) {
      this.setState({ input: ev.target.value });
    }
  }, {
    key: 'handleOnSubmit',
    value: function handleOnSubmit(ev) {
      ev.preventDefault();
      this.socket.emit('chat message', { name: '<Customer:' + this.state.currentCustomer.name + '>', message: this.state.input });

      this.setState({ input: '' });
    }
  }, {
    key: 'getCurrentCustomerId',
    value: function getCurrentCustomerId() {
      var _this2 = this;

      var windowUrl = window.location.href;
      var id = windowUrl.slice(-1);

      _jquery2.default.ajax({
        method: 'GET',
        url: '/queues?queueId=' + id,
        success: function success(data) {
          console.log('successfully grabbed queue data for customer', data);
          _this2.setState({ currentCustomer: data });
          // report queueId to server socket
          _this2.socket.emit('customer report', id);
        },
        failure: function failure(error) {
          console.log('failed to grab queue data for customer', error);
        }
      });
    }
  }, {
    key: 'removeFromQueue',
    value: function removeFromQueue() {
      var _this3 = this;

      var windowUrl = window.location.href;
      var id = windowUrl.slice(-1);
      _jquery2.default.ajax({
        method: 'DELETE',
        url: '/queues?queueId=' + id,
        success: function success(data) {
          // report queueId to server socket
          _this3.socket.emit('customer report', id);
          window.location.replace('/');
        },
        failure: function failure(error) {
          console.log('failed to remove customer from queue', error);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var messages = this.state.messages;
      var message = messages.map(function (item) {
        return _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'span',
              { style: { 'font-weight': 'bold' } },
              item.name
            ),
            ' ',
            _react2.default.createElement(
              'span',
              null,
              item.message
            )
          )
        );
      });

      return _react2.default.createElement(
        'div',
        { className: 'customer-queue-info-container' },
        _react2.default.createElement(_CustomerBanner2.default, { customer: this.state.currentCustomer }),
        _react2.default.createElement(
          'h5',
          null,
          'YOUR QUEUE NUMBER IS'
        ),
        this.state.ready ? _react2.default.createElement(
          'h3',
          { className: 'ready-noti' },
          'Your table is ready!'
        ) : _react2.default.createElement(
          'div',
          { className: 'queue-position-display' },
          _react2.default.createElement(
            'span',
            { className: 'position-number' },
            this.state.currentCustomer.position
          ),
          _react2.default.createElement(
            'h6',
            null,
            'your approximate wait time is:'
          ),
          _react2.default.createElement(
            'span',
            { className: 'wait-time-indicator' },
            this.state.currentCustomer.wait
          ),
          _react2.default.createElement(
            'p',
            { className: 'groups-in-front-indicator' },
            'There are currently ',
            this.state.currentCustomer.queueInFrontCount,
            ' groups in front of you'
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { className: 'btn btn-outline-primary', onClick: this.openModal },
            'Chat'
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'button',
              { className: 'btn btn-outline-primary', onClick: this.removeFromQueue },
              'Cancel reservation'
            )
          ),
          _react2.default.createElement(
            _reactModal2.default,
            {
              isOpen: this.state.modalIsOpen,
              onRequestClose: this.hideModal,
              style: modalStyles

            },
            _react2.default.createElement(
              'div',
              null,
              message
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'div',
              { className: 'input-group', style: { 'position': 'absolute', 'bottom': '0', 'width': '90%' } },
              _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: 'chat...', 'aria-label': 'chat...', onChange: this.handleOnChange, value: this.state.input }),
              _react2.default.createElement(
                'span',
                { className: 'input-group-btn' },
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-outline-primary', type: 'button', onClick: this.handleOnSubmit, style: { 'margin': '0 15px 20px 0' } },
                  'Send'
                ),
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-outline-primary', type: 'button', onClick: this.hideModal, style: { 'margin': '0 0 20px 0' } },
                  'Close'
                )
              )
            )
          )
        ),
        _react2.default.createElement('br', null)
      );
    }
  }]);

  return QueueInfo;
}(_react2.default.Component);

exports.default = QueueInfo;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("socket.io-client");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("react-modal");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RestaurantInformation = function RestaurantInformation(props) {
  var groupsText = void 0; // change text following group length indicator to be grammatically correct
  props.restaurant.queues.length === 1 ? groupsText = 'group queued' : groupsText = 'groups queued';

  var statusCircle = void 0;
  var openStatusCircle = {
    background: '#4FD135'
  };
  var closedStatusCircle = {
    background: '#C01717'
  };

  var waitTime = _react2.default.createElement(
    'div',
    { className: 'restaurant-wait-time' },
    _react2.default.createElement(
      'i',
      { className: 'tiny material-icons' },
      'access_time'
    ),
    ' ',
    props.restaurant.total_wait - props.restaurant.average_wait,
    ' mins'
  );
  props.restaurant.status === 'Closed' ? statusCircle = closedStatusCircle : statusCircle = openStatusCircle;
  props.restaurant.status === 'Closed' ? waitTime = undefined : waitTime;

  return _react2.default.createElement(
    'div',
    { className: 'restaurant-info-container' },
    _react2.default.createElement(
      'div',
      { className: 'restaurant-info' },
      _react2.default.createElement(
        'div',
        { className: 'restaurant-name' },
        props.restaurant.name
      ),
      _react2.default.createElement(
        'div',
        { className: 'restaurant-queue-info' },
        _react2.default.createElement(
          'div',
          { className: 'restaurant-queue-count' },
          props.restaurant.queues.length,
          ' ',
          groupsText,
          ' ',
          waitTime
        ),
        _react2.default.createElement(
          'div',
          { className: 'restaurant-queue-status' },
          _react2.default.createElement('span', { className: 'status-circle', style: statusCircle }),
          props.restaurant.status
        )
      )
    )
  );
};

exports.default = RestaurantInformation;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _SelectedRestaurant = __webpack_require__(5);

var _SelectedRestaurant2 = _interopRequireDefault(_SelectedRestaurant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// RestaurantCard is what the customers click on the home page to select their restaurant. Routes to /SelectedRestaurant
var RestaurantCard = function (_React$Component) {
  _inherits(RestaurantCard, _React$Component);

  function RestaurantCard(props) {
    _classCallCheck(this, RestaurantCard);

    var _this = _possibleConstructorReturn(this, (RestaurantCard.__proto__ || Object.getPrototypeOf(RestaurantCard)).call(this, props));

    _this.state = {
      restaurantStatus: _this.props.restaurant.status
    };
    return _this;
  }

  _createClass(RestaurantCard, [{
    key: 'render',
    value: function render() {
      var statusCircle = void 0;
      var openStatusCircle = {
        background: '#4FD135'
      };

      var closedStatusCircle = {
        background: '#C01717'
      };

      this.state.restaurantStatus === 'Closed' ? statusCircle = closedStatusCircle : statusCircle = openStatusCircle;

      var image = this.props.restaurant.image;

      return _react2.default.createElement(
        'div',
        { className: 'restaurant-container' },
        _react2.default.createElement(
          'div',
          { className: 'col s12 m7' },
          _react2.default.createElement(
            'div',
            { className: 'card small hoverable' },
            _react2.default.createElement(
              'div',
              { className: 'card-image' },
              _react2.default.createElement('img', { src: image })
            ),
            _react2.default.createElement(
              'div',
              { className: 'card-title' },
              _react2.default.createElement(
                'p',
                { className: 'card-title-text' },
                this.props.restaurant.name
              ),
              _react2.default.createElement(
                'p',
                { className: 'status' },
                _react2.default.createElement('span', { className: 'status-circle', style: statusCircle }),
                this.state.restaurantStatus
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'card-content' },
              _react2.default.createElement(
                'span',
                { className: 'queue-number' },
                'groups in queue: ',
                this.props.restaurant.queues.length,
                ' '
              ),
              _react2.default.createElement(
                'span',
                { className: 'wait-time' },
                'wait time: ',

                this.props.restaurant.total_wait,
                ' mins'
              ),
              _react2.default.createElement(
                'span',
                null,
                ' | restaurant type: ',
                this.props.restaurant.type,
                ' '
              )
            )
          )
        )
      );
    }
  }]);

  return RestaurantCard;
}(_react2.default.Component);

exports.default = RestaurantCard;
// <Link to={`/restaurant/${this.props.restaurant.name}`}>

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(27);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomerSignUp = function (_React$Component) {
  _inherits(CustomerSignUp, _React$Component);

  function CustomerSignUp(props) {
    _classCallCheck(this, CustomerSignUp);

    var _this = _possibleConstructorReturn(this, (CustomerSignUp.__proto__ || Object.getPrototypeOf(CustomerSignUp)).call(this, props));

    _this.state = {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      username: ''
    };
    return _this;
  }

  _createClass(CustomerSignUp, [{
    key: 'handleChange',
    value: function handleChange(e, type) {
      var state = {};
      state[type] = e.target.value;
      this.setState(state);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      var data = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        mobile: this.state.phoneNumber,
        password: this.state.password
      };
      _jquery2.default.ajax({
        url: '/customersignup?username=' + this.state.username + '&password=' + this.state.password,
        method: 'POST',
        data: data,
        success: function success(data) {
          _this2.setState({
            unauthorised: false
          });
          window.location.href = data;
        },
        failure: function failure(err) {
          console.log('failed to load page', err);
        },
        statusCode: {
          401: function _() {
            self.setState({
              unauthorised: true
            });
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'form',
          { className: 'form-signin' },
          _react2.default.createElement(
            'h2',
            { className: 'form-signin-heading' },
            'Sign up'
          ),
          _react2.default.createElement('input', {
            value: this.state.firstName,
            type: 'username',
            id: 'first_name',
            className: 'form-control',
            placeholder: 'First Name',
            'data-error': 'wrong', 'data-success': 'right',
            required: true,
            onChange: function onChange(e) {
              return _this3.handleChange(e, 'firstName');
            }
          }),
          _react2.default.createElement('input', {
            value: this.state.lastName,
            type: 'username',
            id: 'last_name',
            className: 'form-control',
            placeholder: 'Last Name',
            'data-error': 'wrong', 'data-success': 'right',
            required: true,
            onChange: function onChange(e) {
              return _this3.handleChange(e, 'lastName');
            }
          }),
          _react2.default.createElement('input', {
            value: this.state.phoneNumber,
            type: 'username',
            id: 'phone_number',
            className: 'form-control',
            placeholder: 'phoneNumber',
            'data-error': 'wrong', 'data-success': 'right',
            required: true,
            onChange: function onChange(e) {
              return _this3.handleChange(e, 'phoneNumber');
            }
          }),
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'label',
            { className: 'sr-only' },
            'Email address'
          ),
          _react2.default.createElement('input', {
            value: this.state.email,
            type: 'email',
            id: 'email',
            className: 'form-control',
            placeholder: 'email',
            required: true, autoFocus: true,
            onChange: function onChange(e) {
              return _this3.handleChange(e, 'email');
            }
          }),
          _react2.default.createElement('input', {
            value: this.state.password,
            type: 'password',
            id: 'password',
            className: 'form-control',
            placeholder: 'password',
            'data-error': 'wrong', 'data-success': 'right',
            required: true,
            onChange: function onChange(e) {
              return _this3.handleChange(e, 'password');
            }
          }),
          _react2.default.createElement(
            'button',
            {
              className: 'btn btn-lg btn-primary btn-block',
              onClick: function onClick(e) {
                return _this3.handleSubmit(e);
              }
            },
            ' enter '
          )
        )
      );
    }
  }]);

  return CustomerSignUp;
}(_react2.default.Component);

exports.default = CustomerSignUp;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("connect-redis");

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var db = __webpack_require__(3);
var dbQuery = __webpack_require__(7);
var passport = __webpack_require__(39);
var LocalStrategy = __webpack_require__(40).Strategy;
var dbManagerQuery = __webpack_require__(10);
passport.use(new LocalStrategy(function (username, password, done) {
  dbQuery.getManagerInfo(username).then(function (user) {
    if (!user) {
      return done(null, false, { message: 'incorrect username' });
    }
    var inputPassword = dbManagerQuery.genPassword(password, user.passwordSalt);
    if (user.passwordHash !== inputPassword.passwordHash) {
      return done(null, false, { message: 'incorrect password' });
    }
    return done(null, user);
  }).catch(function (err) {
    return done(err);
  });
}));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  db.Manager.findById(id).then(function (user) {
    return done(null, user);
  }).catch(function (err) {
    return done(err, null);
  });
});

module.exports = passport;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (options) {
  return "\n    <!DOCTYPE html>\n      <html>\n      <head>\n        <link rel=\"icon\" type=\"image/png\" href=\"/favicon.png\" />\n        <!--Import Google Icon Font-->\n        <link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">\n        <!--Import customermain.css-->\n        <link type=\"text/css\" rel=\"stylesheet\" href=\"/customer/css/customermain.css\" media=\"screen,projection\"/>\n        <!--Import materialize.css NOTE: right now is combined with customermain, need to refactor -->\n    <!--     <link type=\"text/css\" rel=\"stylesheet\" href=\"./css/materialize.min.css\"  media=\"screen,projection\"/> -->\n\n        <!--Let browser know website is optimized for mobile-->\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>\n\n        <title>q.</title>\n      </head>\n\n      <body>\n        <div id='app'>" + options.component + "</div>\n        <script src='/js/customerApp-bundle.js'></script>\n        <!--Import jQuery before materialize.js-->\n        <script src=\"https://code.jquery.com/jquery-3.2.1.min.js\"></script>\n        <script type=\"text/javascript\" src=\"/customer/js/materialize.min.js\"></script>\n      </body>\n\n      <footer>\n        <br><br><br>\n        <hr>\n        by eggs-coffee-toast\n      </footer>\n    </html>";
};
/***/ })
/******/ ]);