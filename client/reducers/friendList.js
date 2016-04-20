const friendList = (state = [], action) => {
  switch(action.type) {
    case 'INITIALIZE_FRIEND_LIST':
      return [...state, ...action.friendList];
    case 'NEW_FRIEND':
      return [...state, action.friend];
    case 'LOGOUT_SUCCESSFUL':
      return [];
    default:
      return state;
  }
}

export default friendList;
