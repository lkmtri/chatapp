import { combineReducers } from 'redux';
import messages from './messages';
import user from './users';
import friendRequest from './friendRequest';
import signUp from './signUp';
import notification from './notification';
import friendRequestList from './friendRequestList';

const chatApp = combineReducers({
  user,
  friendRequestList,
  messages,
  friendRequest,
  signUp,
  notification
});

export default chatApp;
