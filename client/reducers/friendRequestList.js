const friendRequestList = (state = [], action) => {
  switch(action.type) {
    case 'INITIALIZE_FRIEND_LIST':
      return [...state, ...action.friendRequestList];
    case 'LOGOUT_SUCCESSFUL':
      return [];
    default:
      return state;
  }
}

export default friendRequestList;
