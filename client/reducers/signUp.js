const signUp = (state = {
  success: false,
  usernameExisted: false,
  emailExisted: false,
  request: false,
  username: '',
  password: ''
}, action) => {
  switch(action.type) {
    case 'REQUEST_SIGN_UP':
      return {
        ...state,
        request: true,
        username: action.username,
        password: action.password
      }
    case 'USERNAME_EXISTED':
      return {
        ...state,
        usernameExisted: true,
        request: false,
        username: '',
        password: ''
      }
    case 'EMAIL_EXISTED':
      return {
        ...state,
        emailExisted: true,
        request: false,
        username: '',
        password: ''
      };
    case 'SIGN_UP_SUCCESSFUL':
      return {
        ...state,
        success: true,
        request: false
      };
    case 'LOGOUT_SUCCESSFUL':
    case 'REMOVE_SIGN_UP_ERROR':
      return {
        ...state,
        success: false,
        usernameExisted: false,
        emailExisted: false,
        request: false,
        username: '',
        password: ''
      }
    default:
      return state;
  }
}

export default signUp;
