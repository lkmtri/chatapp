import { socket } from '../api/socket';
import uuid from 'uuid';

const sendingMessage = (messageId, messageTo, message) => {
  return {
    type: 'MESSAGE_SENDING',
    messageId,
    messageTo,
    message
  };
}

const sentMessage = (messageId, messageTo, message) => {
  // console.log('prepare sent action');
  return {
    type: 'NEW_MESSAGE',
    messageId,
  }
}

export const composeMessage = (messageTo, message) => {
  const messageId = uuid.v4();
  const messageData = {
    messageId,
    messageTo,
    message
  };
  return (dispatch) => {
    dispatch(sendingMessage(messageId, messageTo, message));
    setTimeout(() => socket.emit('newMessage', { messageId, messageTo, message }), 1000);
    socket.on('received', (data) => {
      dispatch(sentMessage(data.messageId));
    });
  };
};

export default { composeMessage };

