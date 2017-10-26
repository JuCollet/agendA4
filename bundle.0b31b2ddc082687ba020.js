webpackJsonp([1],{

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(10);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _app = __webpack_require__(31);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = document.getElementById('root');

_reactDom2.default.render(_react2.default.createElement(_app2.default, null), root);

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ControlBox = __webpack_require__(32);

var _ControlBox2 = _interopRequireDefault(_ControlBox);

var _Preview = __webpack_require__(39);

var _Preview2 = _interopRequireDefault(_Preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "App" },
                _react2.default.createElement(_Preview2.default, null),
                _react2.default.createElement(_ControlBox2.default, null)
            );
        }
    }]);

    return App;
}(_react.Component);

exports.default = App;

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Connect = __webpack_require__(33);

var _Connect2 = _interopRequireDefault(_Connect);

var _Events = __webpack_require__(35);

var _Events2 = _interopRequireDefault(_Events);

var _Photos = __webpack_require__(36);

var _Photos2 = _interopRequireDefault(_Photos);

var _Calendar = __webpack_require__(37);

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Select = __webpack_require__(38);

var _Select2 = _interopRequireDefault(_Select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ControlBox = function (_Component) {
  _inherits(ControlBox, _Component);

  function ControlBox(props) {
    _classCallCheck(this, ControlBox);

    var _this = _possibleConstructorReturn(this, (ControlBox.__proto__ || Object.getPrototypeOf(ControlBox)).call(this, props));

    _this.state = {
      userIsAuthorized: false
    };
    _this.userIsAuthorizedUpdate = _this.userIsAuthorizedUpdate.bind(_this);
    _this.renderComponents = _this.renderComponents.bind(_this);
    return _this;
  }

  _createClass(ControlBox, [{
    key: "userIsAuthorizedUpdate",
    value: function userIsAuthorizedUpdate(isAuthorized) {
      this.setState({
        userIsAuthorized: isAuthorized
      });
    }
  }, {
    key: "renderComponents",
    value: function renderComponents() {
      if (this.state.userIsAuthorized) {
        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(_Select2.default, null),
          _react2.default.createElement(_Photos2.default, null),
          _react2.default.createElement(_Calendar2.default, null),
          _react2.default.createElement(_Events2.default, null)
        );
      } else {
        return null;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "ControlBox" },
        _react2.default.createElement(_Connect2.default, { userIsAuthorizedUpdate: this.userIsAuthorizedUpdate }),
        this.renderComponents()
      );
    }
  }]);

  return ControlBox;
}(_react.Component);

exports.default = ControlBox;

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = __webpack_require__(34);

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global gapi*/

var CLIENT_ID = '28576487880-usdrjfiq5c4e9t7992quhgs0vtcfgops.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var Connect = function (_Component) {
  _inherits(Connect, _Component);

  function Connect(props) {
    _classCallCheck(this, Connect);

    var _this = _possibleConstructorReturn(this, (Connect.__proto__ || Object.getPrototypeOf(Connect)).call(this, props));

    _this.state = {
      isSignedIn: false
    };
    _this.fetchCal = _this.fetchCal.bind(_this);
    _this.gapiInit = _this.gapiInit.bind(_this);
    _this.handleAuthClick = _this.handleAuthClick.bind(_this);
    _this.updateSigninStatus = _this.updateSigninStatus.bind(_this);
    return _this;
  }

  _createClass(Connect, [{
    key: "gapiInit",
    value: function gapiInit() {
      var _this2 = this;

      var script = document.createElement("script");
      script.src = "https://apis.google.com/js/client.js";

      script.onload = function () {
        gapi.load('client:auth2', function () {
          gapi.client.init({
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPES
          }).then(function () {
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          }.bind(_this2));
        });
      };

      document.body.appendChild(script);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.gapiInit();
    }
  }, {
    key: "updateSigninStatus",
    value: function updateSigninStatus(isSignedIn) {
      this.setState({
        isSignedIn: isSignedIn
      });
      this.props.userIsAuthorizedUpdate(isSignedIn);
    }
  }, {
    key: "handleAuthClick",
    value: function handleAuthClick() {
      if (this.state.isSignedIn) {
        gapi.auth2.getAuthInstance().signOut();
      } else {
        gapi.auth2.getAuthInstance().signIn();
      }
    }
  }, {
    key: "fetchCal",
    value: function fetchCal() {
      gapi.client.calendar.events.list({
        'calendarId': "#contacts@group.v.calendar.google.com",
        'timeMin': new Date().toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then(function (response) {
        var events = response.result.items;
        console.log(events);
      });
    }
  }, {
    key: "fetchCals",
    value: function fetchCals() {
      gapi.client.calendar.calendarList.list().then(function (response) {
        var events = response.result.items;
        console.log(events);
      });
    }
  }, {
    key: "render",
    value: function render() {

      var title = this.state.isSignedIn ? "Sign out" : "Sign in";

      return _react2.default.createElement(
        "div",
        { className: "Connect" },
        _react2.default.createElement(_Button2.default, { clickHandler: this.handleAuthClick, title: title }),
        this.state.isSignedIn ? _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(_Button2.default, { clickHandler: this.fetchCal, title: "Fetch" }),
          " ",
          _react2.default.createElement(_Button2.default, { clickHandler: this.fetchCals, title: "Fetch cals" }),
          " "
        ) : null
      );
    }
  }]);

  return Connect;
}(_react.Component);

exports.default = Connect;

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  return _react2.default.createElement(
    "div",
    { className: "Button" },
    _react2.default.createElement(
      "button",
      { onClick: function onClick() {
          return props.clickHandler();
        } },
      props.title
    )
  );
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = function (_Component) {
  _inherits(Events, _Component);

  function Events() {
    _classCallCheck(this, Events);

    return _possibleConstructorReturn(this, (Events.__proto__ || Object.getPrototypeOf(Events)).apply(this, arguments));
  }

  _createClass(Events, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", { className: "Events" });
    }
  }]);

  return Events;
}(_react.Component);

exports.default = Events;

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Photos = function (_Component) {
  _inherits(Photos, _Component);

  function Photos() {
    _classCallCheck(this, Photos);

    return _possibleConstructorReturn(this, (Photos.__proto__ || Object.getPrototypeOf(Photos)).apply(this, arguments));
  }

  _createClass(Photos, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement("div", { className: "Photos" });
    }
  }]);

  return Photos;
}(_react.Component);

exports.default = Photos;

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement("div", { className: "Calendar" });
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement(
    "div",
    { className: "Select" },
    _react2.default.createElement(
      "h1",
      null,
      "Select"
    )
  );
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement("div", { className: "Preview" });
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })

},[16]);