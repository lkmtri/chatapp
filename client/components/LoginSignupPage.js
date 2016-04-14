import React, { Component } from 'react';
import Login from './Login';
import SignUp from './SignUp';

class LoginSignupPage extends Component {
  render() {
    return (
      <div className = 'ui padded stackable grid'>
        <div className = 'three wide column'/>
        <div className = 'ten wide stretched column'>
          <div className = "ui two column middle aligned very relaxed stackable grid container">
            <div className ="column">
              <Login/>
            </div>
            <div className ="ui vertical divider">Or</div>
            <div className ="column">
              <SignUp/>
            </div>
          </div>
        </div>
        <div className = 'three wide column'/>
      </div>
    );
  }
}

export default LoginSignupPage;
