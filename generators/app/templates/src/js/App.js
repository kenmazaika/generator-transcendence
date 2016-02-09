// App.js
// This is the entry point of the application and this file hooks up
// the element on the page with HTML id property of `app` to be hooked
// up to the react application.
//
// Additional reducers can be added to the application in this file.
import '../css/application.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import routes from './config/routes';
import $ from 'jquery'
import { combineReducers, createStore } from 'redux'

import { Provider } from 'react-redux';
import {reducer as formReducer} from 'redux-form';

const reduxApp = combineReducers({
  form: formReducer
});

const store = createStore(reduxApp);
const dispatch = (action) => {
  store.dispatch(action);
}
import history from './helpers/history'

const render = () => {
  ReactDOM.render(
    <Provider store={store}><Router history={history}>{routes}</Router></Provider>,
    document.getElementById("app")
  );
};


$(function() {
  render();
  store.subscribe(render);
});
