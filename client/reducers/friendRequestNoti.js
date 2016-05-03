const friendRequestNoti = (state = false, action) => {
  switch(action.type) {
    case 'NEW_FRIEND_REQUEST':
      return true;
    case 'LOGOUT_SUCCESSFUL':
    case 'DISABLE_FRIEND_REQUEST_NOTI':
      return false;
    default:
      return state;
  }
}

export default friendRequestNoti;
