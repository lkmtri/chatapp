const addNotification = (message, data, success) => {
  return {
    type: 'NEW_NOTIFICATION',
    message,
    data,
    success
  };
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  };
}

export default { addNotification, clearNotification };
