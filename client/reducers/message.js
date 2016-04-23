import Immutable from 'immutable';

const message = (state = Immutable.Map({
  lastMessage: {},
  message: Immutable.List.of()
}), action) => {
  switch(action.type) {
    case 'MESSAGE_IN':
    case 'MESSAGE_OUT':
      const messageContent = {
        type: action.type === 'MESSAGE_IN' ? 'in' : 'out',
        message: action.message,
        time: action.time
      };
      const lastMes = action.message.length > 40 ? action.message.substring(0, 40) + ' ..' : action.message;
      // console.log(state);
      const lastMessage = state.set('lastMessage', {
        type: action.type,
        message: lastMes,
        time: action.time
      });
      const newMessage = lastMessage.set('message', state.get('message').concat(messageContent));
      return newMessage;
    default:
      return state;
  }
}

export default message;
