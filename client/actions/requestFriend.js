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

export default requestFriend;
