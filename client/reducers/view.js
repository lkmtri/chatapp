const view = (state = 'message', action) => {
  switch(action.type) {
    case 'ACTIVATE_FRIEND_VIEW':
      return 'friend';
    case 'ACTIVATE_MESSAGE_VIEW':
      return 'message';
    default:
      return state;
  }
}

export default view;
