const notification = (state = {
  message: '',
  data: '',
  success: false
}, action) => {
  switch(action.type) {
    case 'NEW_NOTIFICATION':
      return {
        ...state,
        message: action.message,
        data: action.data,
        success: action.success
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        message: '',
        data: '',
        success: false
      };
    default:
      return state;
  }
}

export default notification;
