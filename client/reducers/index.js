import { combineReducers } from 'redux';
import user from './users';
import signUp from './signUp';
import notification from './notification';
import friendRequestList from './friendRequestList';
import friendList from './friendList';
import messageList from './messageList';

const chatApp = combineReducers({
  user,
  friendRequestList,
  signUp,
  notification,
  friendList,
  messageList
});

export default chatApp;
