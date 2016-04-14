const updateFriendRequested = (state = [], action) => {
  switch(action.type) {
    case 'NEW_FRIEND_REQUEST':
      return [
        ...state,
        action.friend
      ];
    default:
      return state;
  }
}

const friendRequest = (state = {
  friendRequesting: '',
  friendRequested: [],
  friendNotFound: false
}, action) => {
  switch(action.type) {
    case 'NEW_FRIEND_REQUEST':
      console.log('here');
      return {
        ...state,
        friendRequesting: '',
        friendRequested: updateFriendRequested(state.friendRequested, action)
      };
    case 'SENDING_NEW_FRIEND_REQUEST':
      return {
        ...state,
        friendRequesting: action.friend
      };
    case 'FRIEND_NOT_EXIST':
      return {
        ...state,
        friendNotFound: true
      };
    case 'REMOVE_FRIEND_REQUEST_ERROR':
      return {
        ...state,
        friendRequesting: '',
        friendNotFound: false
      };
    default:
      return state;
  }
}

export default friendRequest;
