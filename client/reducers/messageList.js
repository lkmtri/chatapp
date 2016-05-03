import message from './message';
import Immutable from 'immutable';

const composeMessage = (mes) => {
  let unreadCount = 0;
  let message = mes.message.map((m) => {
    const mes = JSON.parse(m);
    if (mes.status !== 'read' && mes.type === 'in') {
      unreadCount = unreadCount + 1;
    }
    return mes;
  });
  let lastMes = message[message.length - 1];
  lastMes.message = lastMes.message.length > 40 ? lastMes.message.substring(0, 40) + ' ..' : lastMes.message;
  message = Immutable.List.of(...message);
  return Immutable.Map({ lastMessage: lastMes, unreadCount, message });
}

const messageList = (state = Immutable.Map({
  active: '',
  newMessageNoti: false,
  messages: Immutable.Map({})
}), action) => {
  switch(action.type) {
    case 'INITIALIZE_MESSAGE_LIST':
      const messages = action.messageList.reduce((prev, e) => {
        return prev.set(e.friend, composeMessage(e));
      }, state.get('messages'));
      return state.set('messages', messages);
    case 'SET_ACTIVE_CHAT':
      return state.set('active', action.friend);
    case 'DELETE_CONVERSATION':
      const newMessageList = state.get('messages').delete(action.friend);
      const active = state.get('active');
      let newState;
      if (active === action.friend) {
        newState = state.set('active', '');
      } else {
        newState = state;
      }
      return newState.set('messages', newMessageList);
    case 'MESSAGE_IN':
      const updatedMessageList = state.get('messages').set(action.friend, message(state.get('messages').get(action.friend), action));
      const activeChat = state.get('active');
      if (activeChat !== action.friend) {
        return state.set('messages', updatedMessageList).set('newMessageNoti', true);
      } else {
        return state.set('messages', updatedMessageList);
      }
    case 'MESSAGE_OUT':
    case 'MESSAGE_DELIVERED':
    case 'MESSAGE_IN_READ':
    case 'MESSAGE_OUT_READ':
      const updatedMessages = state.get('messages').set(action.friend, message(state.get('messages').get(action.friend), action));
      return state.set('messages', updatedMessages);
    case 'DISABLE_NEW_MESSAGE_NOTI':
      return state.set('newMessageNoti', false);
    case 'LOGOUT_SUCCESSFUL':
      return Immutable.Map({
        active: '',
        newMessageNoti: false,
        messages: Immutable.Map({})
      });
    default:
      return state;
  }
}

export default messageList;
