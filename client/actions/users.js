import request from 'superagent';
import socket from '../api/socket';
import fetch from './fetchData';

const requestLogin = (username) => {
  return {
    type: 'REQUEST_LOGIN',
    username
  };
}

const successfulLogin = (token, username) => {
  return {
    type: 'LOGIN_SUCCESSFUL',
    token,
    username
  }
}

const login = ({ username, password }) => {
  return (dispatch) => {
    dispatch(requestLogin(username));
    request
      .post('/authenticate')
      .send({ username, password })
      .end((err, res) => {
        if (res.body.login === 'success') {
          localStorage.setItem('token', res.body.token);
          socket.emit('registerLogin', { username });
          socket.once('loginSuccessful', () => {
            dispatch(successfulLogin(res.body.token, username));
          });
          dispatch(fetch.loadData());
        }
      });
  };
}

const requestSignUp = (username, password) => {
  return {
    type: 'REQUEST_SIGN_UP',
    username,
    password
  };
}

const successfulSignUp = () => {
  return {
    type: 'SIGN_UP_SUCCESSFUL'
  };
}

const usernameExisted = () => {
  return {
    type: 'USERNAME_EXISTED',
  };
}

const emailExisted = () => {
  return {
    type: 'EMAIL_EXISTED',
  }
}

const removeSignUpError = () => {
  return {
    type: 'REMOVE_SIGN_UP_ERROR'
  };
}

const signup = ({ username, password, email }) => {
  return (dispatch) => {
    dispatch(removeSignUpError());
    dispatch(requestSignUp(username, password));
    setTimeout(() => {
        request
        .post('/signup')
        .send({ username, password, email })
        .end((err, res) => {
          if (res.body.success) {
            dispatch(successfulSignUp());
          } else {
            if (res.body.error.usernameExisted) {
              dispatch(usernameExisted());
            }
            if (res.body.error.emailExisted) {
              dispatch(emailExisted());
            }
          }
        })
      }, 1000);
  }
}

const successfulLogout = () => {
  return {
    type: 'LOGOUT_SUCCESSFUL'
  };
}

const logout = (user) => {
  return (dispatch) => {
    socket.emit('registerLogout', user);
    socket.once('logoutSuccessful', () => {
      // TODO: Delete localStorage
      localStorage.removeItem('token');
      dispatch(successfulLogout());
    });
  };
}


export default { login, logout, signup, removeSignUpError, successfulLogin };
