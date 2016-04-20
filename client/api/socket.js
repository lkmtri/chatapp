import io from 'socket.io-client';
import { store } from '../app';
import action from '../actions/socket';

const socket = io('');

socket.on('connect', () => {
  console.log('socket connected');
});

socket.on('message', (d) => {
  const data = JSON.parse(d);
  // console.log('SOCKET MESSAGE: ' + JSON.stringify(data));
  switch(data.type) {
    case 'New Friend':
      store.dispatch(action.newFriend(data.friend));
      return;
    case 'New Friend Request':
      store.dispatch(action.newFriendRequest(data.friend));
      return;
    case 'Message In':
      console.log(d);
      store.dispatch(action.messageIn(data.from, data.message, data.time));
      return;
    case 'Message Out':
      console.log(d);
      store.dispatch(action.messageOut(data.to, data.message, data.time));
      return;
    default:
      return;
  }
});

export default socket;
