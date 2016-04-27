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
    client.zadd(`chat:${from}:${to}`, time, JSON.stringify({ type: 'out', status: 'sent', message, time })),
    client.zadd(`chat:${to}:${from}`, time, JSON.stringify({ type: 'in', status: 'received', message, time })),
    client.publish(`pubsub:${from}`, JSON.stringify({
      type: 'Message Out',
      friend: to,
      message,
      time,
      status: 'sent'
    })),
    client.publish(`pubsub:${to}`, JSON.stringify({
      type: 'Message In',
      friend: from,
      message,
      time,
      status: 'received'
    }))
  );
}

const markReceived = ({ from, to, message, time }) => {
  return Promise.all([
    client.zrem(`chat:${from}:${to}`, JSON.stringify({ type: 'out', status: 'sent', message, time })),
    client.zadd(`chat:${from}:${to}`, time, JSON.stringify({ type: 'out', status: 'delivered', message, time })),
    client.publish(`pubsub:${from}`, JSON.stringify({
      type: 'Message Delivered',
      friend: to,
      message,
      time
    }))
  ]);
}

const markRead = ({ from, to, message, time }) => {
  return Promise.all([
    client
      .zrem(`chat:${from}:${to}`, JSON.stringify({ type: 'out', status: 'delivered', message, time }))
      .then((o) => {
        if (o === 1) {
          client.zadd(`chat:${from}:${to}`, time, JSON.stringify({ type: 'out', status: 'read', message, time }));
          client.publish(`pubsub:${from}`, JSON.stringify({
            type: 'Message Read',
            friend: to,
            message,
            time
          }))
        }
      }),
    client.zrem(`chat:${to}:${from}`, JSON.stringify({ type: 'in', status: 'received', message, time })),
    client.zadd(`chat:${to}:${from}`, time, JSON.stringify({ type: 'in', status: 'read', message, time })),

  ]);
}

const markReceivedAll = ({ from, to }) => {
  return client
    .zrange(`chat:${from}:${to}`, 0, -1)
    .then((convo) => {
      convo.forEach((e) => {
        const mes = JSON.parse(e);
        if (mes.status === 'sent') {
          mes.status = 'delivered';
          client.zrem(`chat:${from}:${to}`, e);
          client.zadd(`chat:${from}:${to}`, mes.time, JSON.stringify(mes));
          client.publish(`pubsub:${from}`, JSON.stringify({
            type: 'Message Delivered',
            friend: to,
            message: mes.message,
            time: mes.time
          }));
        }
      });
    });
}

const loadMessage = (username) => {
  return client
    .zrange(`chat:${username}`, 0, -1)
    .then(async function(chats) {
      const messageList = [];
      for (let i = 0; i < chats.length; i++) {
        const friend = chats[i];
        await markReceivedAll({ from: friend, to: username });
        const messages = await client.zrange(`chat:${username}:${friend}`, 0, -1);
        messageList.push({
          friend,
          message: messages
        });
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

export default { newMessage, loadMessage, deleteMessage, markReceived, markRead };
