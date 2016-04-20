const friendRequestList = (state = [], action) => {
  switch(action.type) {
    case 'INITIALIZE_FRIEND_REQUEST_LIST':
      return [...state, ...action.friendRequestList];
    case 'LOGOUT_SUCCESSFUL':
      return [];
    case 'NEW_FRIEND_REQUEST':
      return [...state, action.friend];
    case 'REMOVE_FRIEND_REQUEST_ITEM':
      const newState = [];
      state.forEach(e => {
        if (e !== action.friend) {
          newState.push(e);
        }
      });
      return newState;
    case 'LOGOUT_SUCCESSFUL':
      return [];
    default:
      return state;
  }
}

export default friendRequestList;
