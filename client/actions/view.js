const activateFriendView = () => {
  return {
    type: 'ACTIVATE_FRIEND_VIEW'
  };
}

const activateMessageView = () => {
  return {
    type: 'ACTIVATE_MESSAGE_VIEW'
  };
}

export default { activateMessageView, activateFriendView };
