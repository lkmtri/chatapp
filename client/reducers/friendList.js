import Immutable from 'immutable';

const friendList = (state = Immutable.List.of(), action) => {
  switch(action.type) {
    case 'INITIALIZE_FRIEND_LIST':
      // console.log(state);
      return state.push(...action.friendList);
    case 'NEW_FRIEND':
      return state.push(action.friend);
    case 'LOGOUT_SUCCESSFUL':
      return [];
    default:
      return state;
  }
}

export default friendList;
