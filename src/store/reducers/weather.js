export default (state = {
    cities: [],
    preCities: ['San Diego, CA', 'New York, NY', 'Juneau, AK']
}, action) => {
    switch (action.type) {
        case 'GET_WEATHER':
            return {
                ...state
            }
        case 'GET_WEATHER_SUCCESS':
            return {
                ...state,
                cities: [
                    ...state.cities,
                    {
                        cityName: action.payload.location.city,
                        tempCurrent: action.payload.item.condition.temp,
                        tempLow: action.payload.item.forecast[0].low,
                        tempHigh: action.payload.item.forecast[0].high,
                        statusText: action.payload.item.forecast[0].text,
                        statusImage: action.payload.image.url
                    }
                ]
            }
        case 'GET_WEATHER_FAIL':
            return {
                ...state,

            }
        default:
            return state
    }
}