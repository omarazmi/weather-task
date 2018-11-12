"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocationWeatherInfo = exports.GET_WEATHER_FAIL = exports.GET_WEATHER_SUCCESS = exports.GET_WEATHER = void 0;

require("isomorphic-fetch");

var GET_WEATHER = 'GET_WEATHER';
exports.GET_WEATHER = GET_WEATHER;
var GET_WEATHER_SUCCESS = 'GET_WEATHER_SUCCESS';
exports.GET_WEATHER_SUCCESS = GET_WEATHER_SUCCESS;
var GET_WEATHER_FAIL = 'GET_WEATHER_FAIL';
exports.GET_WEATHER_FAIL = GET_WEATHER_FAIL;

var getLocationWeatherInfo = function getLocationWeatherInfo() {
  return function (dispatch, getState) {
    console.log("getLocationWeatherInfo", getState().weather);
    var staticCities = getState().weather.preCities;
    staticCities.forEach(function (city) {
      fetch("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22".concat(encodeURIComponent(city), "\")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")).then(function (response) {
        return response.json();
      }).then(function (response) {
        dispatch({
          type: GET_WEATHER_SUCCESS,
          city: city,
          payload: response.query.results.channel
        });
      }).catch(function (err) {
        dispatch({
          type: GET_WEATHER_FAIL,
          payload: err
        });
      });
    });
  };
};

exports.getLocationWeatherInfo = getLocationWeatherInfo;