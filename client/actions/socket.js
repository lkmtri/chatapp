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

const messageIn = (friend, message, time) => {
  return {
    type: 'MESSAGE_IN',
    friend,
    message,
    time
  };
}

const messageOut = (friend, message, time) => {
  return {
    type: 'MESSAGE_OUT',
    friend,
    message,
    time
  };
}

export default { newFriend, newFriendRequest, messageIn, messageOut };
