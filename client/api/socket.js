import io from 'socket.io-client';
import { store } from '../app';
import action from '../actions/socket';
import newMessageNoti from '../actions/newMessageNoti';
import request from 'superagent';
import notification from '../actions/notification';
const socket = io('');

socket.on('connect', () => {
  console.log('socket connected');
});

socket.on('message', (d) => {
  const data = JSON.parse(d);
  // console.log('SOCKET MESSAGE: ' + JSON.stringify(data));
  switch(data.type) {
    case 'New Friend Accept':
      store.dispatch(action.newFriend(data.friend));
      store.dispatch(notification.addNotification(data.friend + ' accepted your friend request.', '', true));
      setTimeout(() => {
        store.dispatch(notification.clearNotification());
      }, 5000);
      return;
    case 'New Friend':
      store.dispatch(action.newFriend(data.friend));
      return;
    case 'New Friend Request':
      store.dispatch(action.newFriendRequest(data.friend));
      store.dispatch(notification.addNotification(data.friend + ' sent you a frend request.', '', true));
      setTimeout(() => {
        store.dispatch(notification.clearNotification());
      }, 5000);
      return;
    case 'Message In':
      request
        .post('/messageReceived')
        .send({ ...data, token: localStorage.token })
        .end((err, res) => {
      	  store.dispatch(action.messageIn(data));
      	});
      return;
    case 'Message Out':
      store.dispatch(action.messageOut(data));
      return;
    case 'Message Delivered':
      store.dispatch(action.messageDelivered(data));
      return;
    case 'Message Read':
      store.dispatch(action.messageRead(data));
      return;
    default:
      return;
  }
});

export default socket;
