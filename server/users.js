import { createClient } from 'then-redis';

const client = createClient();

client.on('connect', () => {
  console.log('database connected');
});

const addNewUser = ({ username, password, email }) => {
  const data = {
    password,
    email
  };

  return Promise.all([
    client.setnx(`user:${username}`, JSON.stringify(data)),
    client.setnx(`email:${email}`, username)
  ]);
}

const checkCredentials = ({ username, password }) => {
  return client
    .get(`user:${username}`)
    .then((o) => {
      o = JSON.parse(o);
      if (password === o.password) {
        return true;
      } else {
        return false;
      }
    });
}

const isExistingEmail = (email) => {
  return client
    .get(`email:${email}`)
    .then((o) => {
      if (o) {
        return true;
      } else {
        return false;
      }
    });
}

const isExistingUsername = (username) => {
  return client
    .get(`user:${username}`)
    .then((o) => {
      if (o) {
        return true;
      } else {
        return false;
      }
    });
}

const addFriendRequest = ({ username, friend , time }) => {
  const outRequest = {
    friend,
    time
  };
  const inRequest = {
    username,
    time
  };

  return Promise.all([
    client.zadd(`friendRequest:out:${username}`, time, friend),
    client.zadd(`friendRequest:in:${friend}`, time, username)
  ]);
}

const getFriendRequest = (username) => {
  return client.zrange(`friendRequest:in:${username}`, 0, -1);
}

export default { client, addNewUser, checkCredentials, addFriendRequest, isExistingUsername, isExistingEmail, getFriendRequest };
