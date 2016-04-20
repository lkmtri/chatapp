import request from 'superagent';
import socket from '../api/socket';
import user from './users';

const initializeFriendList = (friendRequestList) => {
  return {
    type: 'INITIALIZE_FRIEND_REQUEST_LIST',
    friendRequestList
  };
}

const initializeFriendRequestList = (friendList) => {
  return {
    type: 'INITIALIZE_FRIEND_LIST',
    friendList
  };
}

const initializeMessageList = (messageList) => {
  return {
    type: 'INITIALIZE_MESSAGE_LIST',
    messageList
  };
}

const fetchFriendRequest = () => {
  return (dispatch) => {
    if (localStorage.token) {
      request
        .post('/fetchFriendRequest')
        .send({ token: localStorage.token })
        .end((err, res) => {
          if (res.body.success) {
            dispatch(initializeFriendList(res.body.friendRequestList));
          }
        });
    }
  }
}

const fetchMessageList = () => {
  return (dispatch) => {
    if (localStorage.token) {
      request
        .post('/fetchMessageList')
        .send({ token: localStorage.token })
        .end((err, res) => {
          if (res.body.success) {
            dispatch(initializeMessageList(res.body.messageList));
          }
        });
    }
  }
}

const fetchFriendList = () => {
  return (dispatch) => {
    if (localStorage.token) {
      request
        .post('/fetchFriendList')
        .send({ token: localStorage.token })
        .end((err, res) => {
          if (res.body.success) {
            // console.log(res.body.friendList);
            dispatch(initializeFriendRequestList(res.body.friendList));
          }
        });
    }
  }
}

const loadData = () => {
  return (dispatch) => {
    dispatch(fetchFriendRequest());
    dispatch(fetchFriendList());
    dispatch(fetchMessageList());
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
                dispatch(user.successfulLogin(localStorage.token, res.body.username));
                dispatch(loadData());
              });
            }
          });
      }
  }
}

export default { fetch, loadData };
