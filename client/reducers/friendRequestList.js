import Immutable from 'immutable';

const friendRequestList = (state = Immutable.List.of(), action) => {
  switch(action.type) {
    case 'INITIALIZE_FRIEND_REQUEST_LIST':
      return state.push(...action.friendRequestList);
    case 'LOGOUT_SUCCESSFUL':
      return Immutable.List.of();
    case 'NEW_FRIEND_REQUEST':
      return state.push(action.friend);
    case 'REMOVE_FRIEND_REQUEST_ITEM':
      return state.filterNot(x => x === action.friend);
    default:
      return state;
  }
}

export default friendRequestList;
