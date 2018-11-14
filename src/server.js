import React from 'react'
import { renderToString } from 'react-dom/server'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './App'
import { getLocationWeatherInfo } from './store/actions/weather'


module.exports = function render(initialState) {
  // Configure the store with the initial state provided
  const store = configureStore(initialState);

  return new Promise((resolve, reject) => {
    store.dispatch(getLocationWeatherInfo()).then(() => {

      const preloadedState = store.getState();

      const content = renderToString(
        <Provider store={store} >
          <App />
        </Provider>
      );
      return resolve({ content, preloadedState });

    })
      .catch(e => reject(e => console.error(e)))
  })

  // Get a copy of store data to create the same store on client side 

}