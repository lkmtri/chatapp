import React, { Component } from 'react';
import { render } from 'react-dom';
import request from 'superagent';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, Link, browserHistory } from 'react-router';
import Index from './components/Index';
import PageNotFound from './components/components/PageNotFound';
import chatApp from './reducers/index';
import $ from 'jquery';

if (window !== undefined) {
  window.jQuery = $;
  window.$ = $;
}

const store = createStore(
  chatApp,
  applyMiddleware(
    thunkMiddleware
  )
);

render((
  <Provider store = {store}>
    <Router history= {browserHistory}>
      <Route path='/' component = {Index}>
      </Route>
      <Route path="*" component={PageNotFound}/>
    </Router>
  </Provider>
), document.getElementById('chat'));
