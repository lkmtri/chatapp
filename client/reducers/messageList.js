import message from './message';

const messageList = (state = {
  active: '',
  messages: []
}, action) => {
  switch(action.type) {
    case 'INITIALIZE_MESSAGE_LIST':
      const mesList = [];
      for (let i = action.messageList.length - 1; i >= 0; i--) {
        let e = action.messageList[i];
        e.lastMessage = JSON.parse(e.message[e.message.length - 1]);
        let mes = e.message.map((m) => {
          return JSON.parse(m);
        });
        e.message = mes;
        mesList.push(e);
      }
      return {
        ...state,
        messages: mesList
      };
    case 'SET_ACTIVE_CHAT':
      return {
        ...state,
        active: action.friend,
      };
    case 'MESSAGE_IN':
    case 'MESSAGE_OUT':
      let newMessage, isFound = false, i;
      for (i = 0; i < state.messages.length; i++) {
        if (state.messages[i].friend === action.friend) {
          newMessage = message(state.messages[i], action);
          isFound = true;
          break;
        }
      }
      const newState = [];
      if (isFound) {
        newState.push(newMessage);
        state.messages.forEach((e) => {
          if (e.friend !== action.friend)
            newState.push(e);
        });
      } else {
        newMessage = {
          friend: action.friend,
          lastMessage: '',
          message: []
        };
        newMessage = message(newMessage, action);
        newState.push(newMessage);
        state.messages.forEach((e) => {
          newState.push(e);
        });
      }
      return {
        ...state,
        messages: newState
      };
    case 'LOGOUT_SUCCESSFUL':
      return {
        active: '',
        messages: []
      };
    default:
      return state;
  }
}

export default messageList;
