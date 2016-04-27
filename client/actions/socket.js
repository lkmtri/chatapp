const newFriend = (friend) => {
  return {
    type: 'NEW_FRIEND',
    friend
  };
}

const newFriendRequest = (friend) => {
  return {
    type: 'NEW_FRIEND_REQUEST',
    friend
  };
}

const messageIn = ({ friend, message, time, status }) => {
  return {
    type: 'MESSAGE_IN',
    friend,
    message,
    time,
    status
  };
}

const messageOut = ({ friend, message, time, status }) => {
  return {
    type: 'MESSAGE_OUT',
    friend,
    message,
    time,
    status
  };
}

const messageDelivered = ({ friend, message, time }) => {
  return {
    type: 'MESSAGE_DELIVERED',
    friend,
    message,
    time
  };
}

const messageRead = ({ friend, message, time }) => {
  return {
    type: 'MESSAGE_OUT_READ',
    friend,
    message,
    time
  };
}

export default { newFriend, newFriendRequest, messageIn, messageOut, messageDelivered, messageRead };
