import request from 'superagent';
import notification from './notification';

const requestFriend = (friend) => {
  return (dispatch) => {
    const d = new Date();
    const time = d.getTime();
    request
      .post('/requestFriend')
      .send({ token: localStorage.token, friend, time })
      .end((err, res) => {
        if (res.body.success) {
          dispatch(notification.addNotification('Friend request sent to ', friend, true));
          setTimeout(() => {
            dispatch(notification.clearNotification());
          }, 5000);
        } else if (res.body.message === 'Friend Not Exist') {
          dispatch(notification.addNotification('Friend request failed. Username does not exist: ', friend, false));
          setTimeout(() => {
            dispatch(notification.clearNotification());
          }, 5000);
        }
      });
  }
}

const acceptFriendRequest = (friend) => {
  return (dispatch) => {
    const d = new Date();
    const time = d.getTime();
    request
      .post('/acceptFriendRequest')
      .send({ token: localStorage.token, friend, time })
      .end((err, res) => {
        // console.log(res);
        if (res.body.success) {
          dispatch({
            type: 'REMOVE_FRIEND_REQUEST_ITEM',
            friend
          });
        }
      });
  }
}

const declineFriendRequest = (friend) => {
  return (dispatch) => {
    request
      .post('/declineFriendRequest')
      .send({ token: localStorage.token, friend})
      .end((err, res) => {
        // console.log(res);
        if (res.body.success) {
          dispatch({
            type: 'REMOVE_FRIEND_REQUEST_ITEM',
            friend
          });
        }
      });
  }
}

export default { requestFriend, acceptFriendRequest, declineFriendRequest };
