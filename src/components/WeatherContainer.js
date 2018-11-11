import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getLocationWeatherInfo } from '../store/actions/weather';
import WeatherInfo from './WeatherInfo';

class WeatherContainer extends Component {
    constructor() {
        super();
        this.state = { currentIndex: 0, cities: [] }
    }

    componentDidMount() {
        this.props.getLocationWeatherInfo()
        this.interval = setInterval(() => this.rotateCity(), 3000);
    }

    rotateCity() {
        let { currentIndex, cities } = this.state
        let citiesNumber = cities.length
        if (currentIndex < citiesNumber && currentIndex + 1 < citiesNumber) {
            this.setState({ currentIndex: this.state.currentIndex + 1 });
        } else {
            this.setState({ currentIndex: 0 });
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.weather.cities.length !== this.state.cities.length) {
            this.setState({ cities: newProps.weather.cities })
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    addNewCity = () => {
        const city = this.state.inputValue
        fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(city)}")&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`)
            .then(response => response.json())
            .then(response => {
                if(null !== response.query.results) {
                this.setState({
                    cities: [
                        ...this.state.cities,
                        {
                            cityName: response.query.results.channel.location.city,
                            tempCurrent: response.query.results.channel.item.condition.temp,
                            tempLow: response.query.results.channel.item.forecast[0].low,
                            tempHigh: response.query.results.channel.item.forecast[0].high,
                            statusText: response.query.results.channel.item.forecast[0].text,
                            statusImage: response.query.results.channel.image.url
                        }
                    ]
                })
            } else {
                console.log("cann't find the location")
            }
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        if (this.state.cities.length > 0)
            return (
                <div>
                    <WeatherInfo data={this.state.cities[this.state.currentIndex]} />
                    <input onChange={(event) => { this.setState({ inputValue: event.target.value }) }} />
                    <button onClick={this.addNewCity}><label>Add</label></button>
                </div>
            )
        else
            return (<div>Loading Weather Info</div>);
    }

}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        getLocationWeatherInfo: (city) => dispatch(getLocationWeatherInfo(city))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);