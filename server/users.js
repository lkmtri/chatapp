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

const acceptFriendRequest = ({ username, friend, time }) => {
  console.log(`ACCEPT_FRIEND_REQUEST: ${username} ${friend}`);
  return Promise.all([
    client.zrem(`friendRequest:in:${username}`, friend),
    client.zrem(`friendRequest:out:${friend}`, username),
    client.zadd(`friendList:${username}`, time, friend),
    client.zadd(`friendList:${friend}`, time, username),
    client.publish(`pubsub:${username}`, JSON.stringify({
      type: 'New Friend',
      friend: friend
    })),
    client.publish(`pubsub:${friend}`, JSON.stringify({
      type: 'New Friend Accept',
      friend: username
    }))
  ]);
}

const declineFriendRequest = ({ username, friend }) => {
  return Promise.all([
    client.zrem(`friendRequest:in:${username}`, friend),
    client.zrem(`friendRequest:out:${friend}`, username)
  ]);
}

const addFriendRequest = ({ username, friend , time }) => {
  console.log(`ADD_FRIEND_REQUEST: ${username}, ${friend}`);
  if (username === friend)
    return;
  return client
    .zscore(`friendRequest:in:${username}`, friend)
    .then((o) => {
      if (o !== null) {
        return Promise.all([
          client.zrem(`friendRequest:in:${username}`, friend),
          client.zrem(`friendRequest:out:${friend}`, username),
          client.zadd(`friendList:${username}`, time, friend),
          client.zadd(`friendList:${friend}`, time, username),
          client.publish(`pubsub:${username}`, JSON.stringify({
            type: 'New Friend Accept',
            friend: friend
          })),
          client.publish(`pubsub:${friend}`, JSON.stringify({
            type: 'New Friend Accept',
            friend: username
          }))
        ]);
      } else {
        return Promise.all([
          client.zadd(`friendRequest:out:${username}`, time, friend),
          client.zadd(`friendRequest:in:${friend}`, time, username),
          client.publish(`pubsub:${friend}`, JSON.stringify({
            type: 'New Friend Request',
            friend: username
          }))
        ]);
      }
    });
}

const getFriendList = (username) => {
  return client.zrange(`friendList:${username}`, 0, -1);
}

const getFriendRequest = (username) => {
  return client.zrange(`friendRequest:in:${username}`, 0, -1);
}

export default { addNewUser, checkCredentials, addFriendRequest, isExistingUsername, isExistingEmail, getFriendRequest, getFriendList, acceptFriendRequest, declineFriendRequest };
