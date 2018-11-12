import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './App';
import configureStore from './store/configureStore';

import * as serviceWorker from './serviceWorker';

const state = window.__STATE__;
// delete window.__STATE__;

const store = configureStore(state);

ReactDOM.hydrate(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
