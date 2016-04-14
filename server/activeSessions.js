import redis from './users';

const registerLogin = ({ username, socketID  }) => {
  return redis.client.mset(`usernameToSocketID:${username}`, socketID, `socketIDToUsername:${socketID}`, username);
}

const registerLogout = (socketID) => {
  return redis.client
    .get(`socketIDToUsername:${socketID}`)
    .then((username) => {
      redis.client.del(`usernameToSocketID:${username}`, `socketIDToUsername:${socketID}`);
    });
}

export default { registerLogin, registerLogout };
