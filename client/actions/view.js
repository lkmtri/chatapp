const activateFriendRequestView = () => {
  return {
    type: 'ACTIVATE_FRIEND_REQUEST_VIEW'
  };
}

const activateMessageView = () => {
  return {
    type: 'ACTIVATE_MESSAGE_VIEW'
  };
}

const activateFriendView = () => {
  return {
    type: 'ACTIVATE_FRIEND_VIEW'
  }
}

export default { activateMessageView, activateFriendRequestView, activateFriendView };
