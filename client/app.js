import React, { Component } from 'react';
import { render } from 'react-dom';
import request from 'superagent';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, Link, browserHistory } from 'react-router';
import Login from './components/Login';
// import SignUp from './components/SignUp';
import Index from './components/Index';
import PageNotFound from './components/PageNotFound';
import Chat from './components/Chat';
import chatApp from './reducers/index';
import Logout from './components/Logout';
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
