import message from './message';
import Immutable from 'immutable';

const composeMessage = (mes) => {
  let message = mes.message.map((m) => {
    return JSON.parse(m);
  });
  let lastMes = message[message.length - 1];
  lastMes.message = lastMes.message.length > 40 ? lastMes.message.substring(0, 40) + ' ..' : lastMes.message;
  message = Immutable.List.of(...message);
  return Immutable.Map({ lastMessage: lastMes, message });
}

const messageList = (state = Immutable.Map({
  active: '',
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
    case 'MESSAGE_IN':
    case 'MESSAGE_OUT':
      const updatedMessages = state.get('messages').set(action.friend, message(state.get('messages').get(action.friend), action));
      return state.set('messages', updatedMessages);
    case 'LOGOUT_SUCCESSFUL':
      return Immutable.Map({
        active: '',
        messages: Immutable.Map({})
      });
    default:
      return state;
  }
}

export default messageList;
