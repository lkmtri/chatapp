import request from 'superagent';
import { socket } from '../api/socket';

const fetchFriendRequest = () => {
  return (dispatch) => {
    if (localStorage.token) {
      request
        .post('/fetchFriendRequest')
        .send({ token: localStorage.token })
        .end((err, res) => {
          if (res.body.success) {
            dispatch({
              type: 'INITIALIZE_FRIEND_LIST',
              friendRequestList: res.body.friendRequestList
            });
          }
        });
    }
  }
}

const fetchFriendList = () => {
  return (dispatch) => {

  }
}

const loadData = () => {
  return (dispatch) => {
    dispatch(fetchFriendRequest());
  }
}

const fetch = () => {
  return (dispatch) => {
      if (localStorage.token) {
        request
          .post('/loginExistingSession')
          .send({ token: localStorage.token })
          .end((err, res) => {
            if (res.body.verify) {
              socket.emit('registerLogin', { username: res.body.username });
              socket.once('loginSuccessful', () => {
                dispatch({
                  type: 'LOGIN_SUCCESSFUL',
                  token: localStorage.token,
                  username: res.body.username
                });
              });
              dispatch(loadData());
            }
          });
      }
  }
}

export default { fetch, loadData };
