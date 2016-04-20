import { combineReducers } from 'redux';
import user from './users';
import signUp from './signUp';
import notification from './notification';
import friendRequestList from './friendRequestList';
import friendList from './friendList';
import messageList from './messageList';
import view from './view';

const chatApp = combineReducers({
  user,
  view,
  friendRequestList,
  signUp,
  notification,
  friendList,
  messageList
});

export default chatApp;
