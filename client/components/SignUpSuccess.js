import React, { Component } from 'react';
import { connect } from 'react-redux';
import user from '../actions/users';

class SignUpSuccess extends Component {
  render() {
    return (
      <div className ="ui icon message">
        <i className ="notched circle loading icon"></i>
        <div className="content">
          <div className="header">
            Sign up successful.
          </div>
          <p>Login as <span style = {{fontWeight: 'bold'}}>{ this.props.signUpStatus.username }</span></p>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const userInfo = {
      username: this.props.signUpStatus.username,
      password: this.props.signUpStatus.password
    };
    setTimeout(() => {
      this.props.dispatch(user.login(userInfo));
    }, 2500);
  }
}

const mapStateToProps = (state) => {
  return {
    signUpStatus: state.signUp
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

SignUpSuccess = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpSuccess);

export default SignUpSuccess;
