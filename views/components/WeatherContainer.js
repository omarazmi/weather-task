"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _weather = require("../store/actions/weather");

var _WeatherInfo = _interopRequireDefault(require("./WeatherInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var WeatherContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(WeatherContainer, _Component);

  function WeatherContainer() {
    var _this;

    _classCallCheck(this, WeatherContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WeatherContainer).call(this));
    _this.state = {
      currentIndex: 0,
      cities: []
    };
    return _this;
  }

  _createClass(WeatherContainer, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log("componentWillMount()"); // this.props.getLocationWeatherInfo()
      // this.interval = setInterval(() => this.rotateCity(), 5000);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      console.log("componentDidMount()");
      this.props.getLocationWeatherInfo();
      this.interval = setInterval(function () {
        return _this2.rotateCity();
      }, 5000);
    }
  }, {
    key: "rotateCity",
    value: function rotateCity() {
      var _this$state = this.state,
          currentIndex = _this$state.currentIndex,
          cities = _this$state.cities;
      var citiesNumber = cities.length;

      if (currentIndex < citiesNumber && currentIndex + 1 < citiesNumber) {
        this.setState({
          currentIndex: this.state.currentIndex + 1
        });
      } else {
        this.setState({
          currentIndex: 0
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      // if (this.state.cities.length === 0) 
      console.log("componentWillReceiveProps", newProps);
      console.log(newProps.weather.cities.length !== this.state.cities.length);

      if (newProps.weather.cities.length !== this.state.cities.length) {
        this.setState({
          cities: newProps.weather.cities
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: "addNewCity",
    value: function addNewCity() {
      var _this3 = this;

      var city = this.state.inputValue;
      fetch("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22".concat(encodeURIComponent(city), "\")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (null !== response.query.results) {
          _this3.setState({
            cities: _toConsumableArray(_this3.state.cities).concat([{
              cityName: response.query.results.channel.location.city,
              tempCurrent: response.query.results.channel.item.condition.temp,
              tempLow: response.query.results.channel.item.forecast[0].low,
              tempHigh: response.query.results.channel.item.forecast[0].high,
              statusText: response.query.results.channel.item.forecast[0].text,
              statusImage: response.query.results.channel.image.url
            }])
          });
        } else {
          console.log("cann't find the location");
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      console.log("render");
      console.log("this.state", this.state);
      return (// <div>
        //     {
        //         this.state.cities.length > 0 ? (
        _react.default.createElement("div", null, _react.default.createElement(_WeatherInfo.default, {
          data: this.state.cities[this.state.currentIndex]
        }), _react.default.createElement("input", {
          onChange: function onChange(event) {
            _this4.setState({
              inputValue: event.target.value
            });
          }
        }), _react.default.createElement("button", {
          onClick: this.addNewCity.bind(this)
        }, _react.default.createElement("label", null, "Add"))) //     ) : (<div> Loading </div>)
        // }
        // </div>

      );
    }
  }]);

  return WeatherContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return state;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getLocationWeatherInfo: function getLocationWeatherInfo() {
      return dispatch((0, _weather.getLocationWeatherInfo)());
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(WeatherContainer);

exports.default = _default;