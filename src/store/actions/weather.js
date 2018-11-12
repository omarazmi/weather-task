import 'isomorphic-fetch';

export const GET_WEATHER = 'GET_WEATHER'
export const GET_WEATHER_SUCCESS = 'GET_WEATHER_SUCCESS'
export const GET_WEATHER_FAIL = 'GET_WEATHER_FAIL'

export const getLocationWeatherInfo = () => (dispatch, getState) => {
    console.log("getLocationWeatherInfo", getState().weather)
    const staticCities = getState().weather.preCities;
    const promises = [];
    staticCities.forEach((city) => {
        promises.push(
            fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(city)}")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
                .then(response => response.json())
                .then(response => {
                    dispatch({ type: GET_WEATHER_SUCCESS, city, payload: response.query.results.channel });
                })
                .catch(err => {
                    dispatch({ type: GET_WEATHER_FAIL, payload: err });
                })
        )
    })
    return promises;

}