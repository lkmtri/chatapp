import socket from '../api/socket';
import uuid from 'uuid';
import request from 'superagent';

const sendingMessage = ({ messageId, messageTo, message, time }) => {
  return {
    type: 'MESSAGE_SENDING',
    messageId,
    messageTo,
    message,
    time
  };
}

export const composeMessage = (messageTo, message) => {
  const messageId = uuid.v4();
  const d = new Date();
  const time = d.getTime();
  const messageData = {
    token: localStorage.token,
    messageId,
    messageTo,
    message,
    time
  };

  return (dispatch) => {
    dispatch(sendingMessage(messageData));
    request
      .post('/newMessage')
      .send(messageData)
      .end((err, res) => {
        if (res.body.success) {
          console.log('message sent');
        }
      });
  };
};

export default { composeMessage };

