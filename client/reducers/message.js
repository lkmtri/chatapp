const message = (state = {
  friend: '',
  lastMessage: {},
  message: []
}, action) => {
  switch(action.type) {
    case 'MESSAGE_IN':
    case 'MESSAGE_OUT':
      const messageContent = {
        type: action.type === 'MESSAGE_IN' ? 'in' : 'out',
        message: action.message,
        time: action.time
      };
      return {
        ...state,
        lastMessage: {
          type: action.type,
          message: action.message,
          time: action.time
        },
        message: [ ...state.message, messageContent ]
      };
    default:
      return state;
  }
}

export default message;
