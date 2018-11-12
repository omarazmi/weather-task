"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    cities: [],
    preCities: ['San Diego, CA', 'New York, NY', 'Juneau, AK']
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'GET_WEATHER':
      return _objectSpread({}, state);

    case 'GET_WEATHER_SUCCESS':
      return _objectSpread({}, state, {
        cities: _toConsumableArray(state.cities).concat([{
          cityName: action.payload.location.city,
          tempCurrent: action.payload.item.condition.temp,
          tempLow: action.payload.item.forecast[0].low,
          tempHigh: action.payload.item.forecast[0].high,
          statusText: action.payload.item.forecast[0].text,
          statusImage: action.payload.image.url
        }])
      });

    case 'GET_WEATHER_FAIL':
      return _objectSpread({}, state);

    default:
      return state;
  }
};

exports.default = _default;