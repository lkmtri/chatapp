import React, { Component } from 'react';
import { connect } from 'react-redux';
import user from '../../actions/users';
import SignUpSuccess from './SignUpSuccess';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      usernameField: 'field',
      usernameErrorMessage: 'ui hidden error message',
      emailField: 'field',
      emailErrorMessage: 'ui hidden error message',
      success: false,
      button: 'ui teal button'
    }
  }

  render() {
    return (
      <div>
        { this.state.success ? (
            <SignUpSuccess/>
          ) : (
            <form className = 'ui form error' onSubmit = { this.onSubmit }>
              <div className = { this.state.usernameField }>
                <label>Username:</label>
                <div className = 'ui left icon input'>
                  <input placeholder = 'Username' value = { this.state.username } onChange = { this.onChangeUsername }/>
                  <i className = 'user icon'></i>
                </div>
                <div className = { this.state.usernameErrorMessage }>
                  <p>Username existed. </p>
                </div>
              </div>
              <div className = 'field'>
                <label>Password:</label>
                <div className = 'ui left icon input'>
                  <input placeholder = 'Password' value = { this.state.password } type = 'password' onChange = { this.onChangePassword }/>
                  <i className = 'lock icon'></i>
                </div>
              </div>
              <div className = { this.state.emailField }>
                <label>Email:</label>
                <div className = 'ui left icon input'>
                  <input placeholder = 'Email' value = { this.state.email } type = 'email' onChange = { this.onChangeEmail }/>
                  <i className  = 'mail outline icon'></i>
                </div>
                <div className = { this.state.emailErrorMessage }>
                  <p>Email existed. </p>
                </div>
              </div>
              <button className = { this.state.button } type = 'submit'>Sign up</button>
            </form>
          )
        }
      </div>
    );
  }

  componentWillUpdate(nextProps) {
    if (nextProps.signUpStatus.success) {
      this.state.success = true;
    }
    if (nextProps.signUpStatus.request) {
      this.state.button = 'ui loading teal button';
    } else {
      this.state.button = 'ui teal button';
    }
    if (nextProps.signUpStatus.usernameExisted) {
      this.state.usernameField = 'field error';
      this.state.usernameErrorMessage = 'ui error message';
    } else {
      this.state.usernameField = 'field';
      this.state.usernameErrorMessage = 'ui hidden error message';
    }

    if (nextProps.signUpStatus.emailExisted) {
      this.state.emailField = 'field error';
      this.state.emailErrorMessage = 'ui error message';
    } else {
      this.state.emailField = 'field';
      this.state.emailErrorMessage = 'ui hidden error message';
    }
  }

  validateFields = () => {
    if (this.state.username !== '') {
      return true;
    }
    return false;
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newuser = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    if (this.validateFields()) {
      this.props.dispatch(user.signup(newuser));
    }
  }

  onChangeUsername = (e) => {
    e.preventDefault();
    this.setState({
      username: e.target.value,
      usernameField: 'field',
      usernameErrorMessage: 'ui hidden error message'
    });
  }

  onChangePassword = (e) => {
    e.preventDefault();
    this.setState({
      password: e.target.value
    });
  }

  onChangeEmail = (e) => {
    e.preventDefault();
    this.setState({
      email: e.target.value,
      emailField: 'field',
      emailErrorMessage: 'ui hidden error message'
    });
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

SignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

export default SignUp;
