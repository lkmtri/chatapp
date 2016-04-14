import Immutable from 'immutable';

const message = (state, action) => {
  switch (action.type) {
    case 'MESSAGE_SENDING':
      return {
        status: action.type,
        messageId: action.messageId,
        messageTo: action.messageTo,
        message: action.message,
      };
    case 'NEW_MESSAGE':
      // console.log(action.type);
      return {
        ...state,
        status: action.type,
      }
    default:
      return state;
  }
};

const messages = (state = [], action) => {
  // const immutableState = Immutable.List.of(...state);
  switch (action.type) {
    case 'MESSAGE_SENDING':
      return [
        ...state,
        message(undefined, action)
      ];
    case 'NEW_MESSAGE':
      return state.map(mes => {
        // console.log('mesID ' + mes.messageId);
        // console.log('action.mesID ' + action.messageId);
        if (mes.messageId !== action.messageId) {
          // console.log('return');
          return mes;
        } else {
          return message(mes, action);
        }
      });
    case 'LOGOUT_SUCCESSFUL':
      return [];
    default:
      return state;
  }
};

export default messages;
