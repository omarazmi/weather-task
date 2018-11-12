"use strict";

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _reactRedux = require("react-redux");

var _configureStore = _interopRequireDefault(require("./store/configureStore"));

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function render(initialState) {
  // Configure the store with the initial state provided
  var store = (0, _configureStore.default)(initialState); // render the App store static markup ins content variable

  var content = (0, _server.renderToString)(_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, _react.default.createElement(_App.default, null))); // Get a copy of store data to create the same store on client side 

  var preloadedState = store.getState();
  return {
    content: content,
    preloadedState: preloadedState
  };
};