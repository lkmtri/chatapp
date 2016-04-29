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
        time: action.time,
        status: action.status
      };
      const lastMes = action.message.length > 40 ? action.message.substring(0, 40) + ' ..' : action.message;
      const lastMessage = state.set('lastMessage', {
        type: action.type === 'MESSAGE_IN' ? 'in' : 'out',
        message: lastMes,
        time: action.time
      });
      const newMessage = lastMessage.set('message', state.get('message').concat(messageContent));
      return newMessage;
    case 'MESSAGE_DELIVERED':
      let newMes;
      for (let i = state.get('message').size - 1; i >= 0; i--) {
        let mes = state.get('message').get(i);
        if (mes.type === 'out' && mes.time === action.time) {
          newMes = state.get('message').set(i, {
            type: 'out',
            message: action.message,
            time: action.time,
            status: 'delivered'
          });
          break;
        }
      }
      return state.set('message', newMes);
    case 'MESSAGE_IN_READ':
    case 'MESSAGE_OUT_READ':
      const type = action.type === 'MESSAGE_IN_READ' ? 'in' : 'out';
      for (let i = state.get('message').size - 1; i >= 0; i--) {
        let mes = state.get('message').get(i);
        if (mes.type === type && mes.time === action.time) {
          newMes = state.get('message').set(i, {
            type,
            message: action.message,
            time: action.time,
            status: 'read'
          });
        }
      }
      return state.set('message', newMes);
    default:
      return state;
  }
}

export default message;
