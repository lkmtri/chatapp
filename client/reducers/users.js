const user = (state = { status: '', username: '', token: '' }, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        status: action.type,
        username: action.username,
        token: ''
      };
    case 'LOGIN_SUCCESSFUL':
      return {
        username: action.username,
        status: action.type,
        token: action.token
      };
    case 'LOGOUT_SUCCESSFUL':
      return {
        status: '',
        username: '',
        token: ''
      }
    default:
      return state;
  }
}

export default user;
