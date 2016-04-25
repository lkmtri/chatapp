import { createClient } from 'then-redis';

const client = createClient();

const newChat = (from, to, time) => {
  return client
    .zscore(`chat:${from}`, to)
    .then((o) => {
      if (o !== null) {
        return client.zincrby(`chat:${from}`, time - o, to);
      } else {
        return client.zadd(`chat:${from}`, time, to);
      }
    })

}

const newMessage = ({ from, to, message, time }) => {
  return Promise.all(
    newChat(from, to, time),
    newChat(to, from, time),
    client.zadd(`chat:${from}:${to}`, time, JSON.stringify({ type: 'out', message, time })),
    client.zadd(`chat:${to}:${from}`, time, JSON.stringify({ type: 'in', message, time })),
    client.publish(`pubsub:${from}`, JSON.stringify({
      type: 'Message Out',
      to,
      message,
      time
    })),
    client.publish(`pubsub:${to}`, JSON.stringify({
      type: 'Message In',
      from,
      message,
      time
    }))
  );
}

const loadMessage = (username) => {
  return client
    .zrange(`chat:${username}`, 0, -1)
    .then(async function(chats) {
      const messageList = [];
      for (let i = 0; i < chats.length; i++) {
        const friend = chats[i];
        const messages = await client.zrange(`chat:${username}:${friend}`, 0, -1);
        messageList.push({
          friend,
          message: messages
        });
        // messageList[friend] = messages;
      };
      return messageList;
    });
}

const deleteMessage = (username, friend) => {
  return Promise.all([
    client.zrem(`chat:${username}`, friend),
    client.del(`chat:${username}:${friend}`)
  ]);
}

export default { newMessage, loadMessage, deleteMessage };
