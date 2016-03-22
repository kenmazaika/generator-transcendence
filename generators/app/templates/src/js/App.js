import '../css/application.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import routes from './config/routes';
import $ from 'jquery';
import { combineReducers, createStore } from 'redux';

import { Provider } from 'react-redux';
import {reducer as formReducer} from 'redux-form';
import history from './helpers/history';


const reduxApp = combineReducers({
  form: formReducer
});

const store = createStore(reduxApp);
const dispatch = (action) => {
  store.dispatch(action);
};

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
