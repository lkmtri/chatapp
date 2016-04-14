import React, { Component } from 'react';
import { connect } from 'react-redux';
import user from '../../actions/users';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <div>
        <form className = 'ui form' onSubmit = {this.onSubmit}>
          <div className = 'field'>
            <label>Username:</label>
            <div className = 'ui left icon input'>
              <input placeholder = 'Username' value = { this.state.username } onChange = { this.onChangeUsername }/>
              <i className= 'user icon'></i>
            </div>
          </div>
          <div className = 'field'>
            <label>Password:</label>
            <div className = 'ui left icon input'>
              <input placeholder = 'Password' value = { this.state.password } type = 'password' onChange = { this.onChangePassword }/>
              <i className= 'lock icon'></i>
            </div>
          </div>
          <button className = 'ui teal button' type = "submit" >Login</button>
        </form>
      </div>
    );
  }

  onSubmit = (e) => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.props.dispatch(user.login({ username, password }));
    this.setState({
      username: '',
      password: ''
    })
  }

  onChangeUsername = (e) => {
    e.preventDefault();
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword = (e) => {
    e.preventDefault();
    this.setState({
      password: e.target.value
    });
  }
}

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default Login;
