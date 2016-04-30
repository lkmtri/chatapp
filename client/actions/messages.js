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
          // console.log('message sent');
        }
      });
  };
};

const deleteMessage = (friend) => {
  return (dispatch) => {
    request
      .post('/deleteMessage')
      .send({ token: localStorage.token, friend })
      .end((err, res) => {
        // console.log(res.body);
        if (res.body.success) {
          dispatch({
            type: 'DELETE_CONVERSATION',
            friend
          });
        }
      });
  }
}

const messageRead = ({ friend, message, time }) => {
  return (dispatch) => {
    request
      .post('/messageRead')
      .send({ token: localStorage.token, friend, message, time })
      .end((err, res) => {
        if (res.body.success) {
          dispatch({
            type: 'MESSAGE_IN_READ',
            friend,
            message,
            time
          });
        }
      });
  }
}

export default { composeMessage, deleteMessage, messageRead };

