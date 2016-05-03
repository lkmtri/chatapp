const view = (state = 'message', action) => {
  switch(action.type) {
    case 'ACTIVATE_FRIEND_REQUEST_VIEW':
      return 'friend_request';
    case 'ACTIVATE_MESSAGE_VIEW':
      return 'message';
    case 'ACTIVATE_FRIEND_VIEW':
      return 'friend';
    case 'LOGOUT_SUCCESSFUL':
      return 'message';
    default:
      return state;
  }
}

export default view;
