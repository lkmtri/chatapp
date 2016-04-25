import express from 'express';
import expressHbs from 'express-handlebars';
import { Server } from 'http';
import bodyParser from 'body-parser';
import config from '../config/config';
import uuid from 'uuid';
import userdb from './users';
import jwt from 'jsonwebtoken';
import message from './message';
import socket from 'socket.io';
import { createClient } from 'then-redis';

const jwtKey = 'secretKey';
const app = express();
const http = Server(app);
const io = socket(http);

app.engine('hbs', expressHbs({
  extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static('./dist'));

app.post('/fetchFriendRequest', (req, res) => {
  const token = req.body.token;
  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      res.json({
        success: false
      });
    } else {
      userdb
        .getFriendRequest(decoded.username)
        .then((o) => {
          res.json({
            success: true,
            friendRequestList: o
          });
        })
        .catch((e) => {
          res.json({
            success: false
          });
        });
    }
  });
});

app.post('/fetchFriendList', (req, res) => {
  const token = req.body.token;
  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      res.json({
        success: false
      });
    } else {
      userdb
        .getFriendList(decoded.username)
        .then((o) => {
          res.json({
            success: true,
            friendList: o
          });
        })
        .catch((e) => {
          res.json({
            success: false
          });
        });
    }
  });
})

app.post('/fetchMessageList', (req, res) => {
  const token = req.body.token;
  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      res.json({
        success: false
      });
    } else {
      message
        .loadMessage(decoded.username)
        .then((o) => {
          res.json({
            success: true,
            messageList: o
          });
        });
    }
  });
});

app.post('/acceptFriendRequest', (req, res) => {
  const token = req.body.token;
  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      res.json({
        success: false
      });
    } else {
      const friendship = {
        username: decoded.username,
        friend: req.body.friend,
        time: req.body.time
      };
      userdb
        .acceptFriendRequest(friendship)
        .then((o) => {
          res.json({
            success: true
          });
        })
        .catch((e) => {
          res.json({
            success: false
          });
        });
    }
  });
});

app.post('/declineFriendRequest', (req, res) => {
  const token = req.body.token;
  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      res.json({
        success: false
      });
    } else {
      const friendship = {
        username: decoded.username,
        friend: req.body.friend,
      };
      userdb
        .declineFriendRequest(friendship)
        .then((o) => {
          res.json({
            success: true
          });
        })
        .catch((e) => {
          res.json({
            success: false
          });
        });
    }
  });
});

app.post('/newMessage', (req, res) => {
  const token = req.body.token;
  jwt.verify(token, jwtKey, (err, decoded) => {
    if (!err) {
      const newMessage = {
        from: decoded.username,
        to: req.body.messageTo,
        message: req.body.message,
        time: req.body.time
      };
      message.newMessage(newMessage);
      res.json({
        success: true
      });
    }
  });
});

app.post('/deleteMessage', (req, res) => {
  const token = req.body.token;
  jwt.verify(token, jwtKey, (err, decoded) => {
    if (!err) {
      message
        .deleteMessage(decoded.username, req.body.friend)
        .then((o) => {
          res.json({
            success: true
          });
        })
        .catch((error) => {
          // console.log(error);
          res.json({
            success: false,
            error
          });
        });
    }
  });
});

app.post('/signup', (req, res) => {
  const newUser = req.body;

  let response = {
    success: false,
    error: {
      emailExisted: true,
      usernameExisted: true
    }
  };

  Promise
    .all([
      userdb.isExistingEmail(newUser.email),
      userdb.isExistingUsername(newUser.username)
    ])
    .then((o) => {
      response.error.emailExisted = o[0];
      response.error.usernameExisted = o[1];
      if (!o[0] && !o[1]) {
        response.success = true;
        userdb
          .addNewUser(newUser)
          .then((o) => {
            res.json(response);
          });
      } else {
        res.json(response);
      }
    })
    .catch((e) => {
      response.error = e;
      res.json(response);
    });
});

app.post('/loginExistingSession', (req, res) => {
  const token = req.body.token;
  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      res.json({
        verify: false,
      });
    } else {
      res.json({
        verify: true,
        username: decoded.username
      });
    }
  })
})

app.post('/requestFriend', (req, res) => {
  const token = req.body.token;
  const friend = req.body.friend;
  const time = req.body.time;

  jwt.verify(token, jwtKey, (err, decoded) => {
    userdb
      .isExistingUsername(friend)
      .then((o) => {
        if (o) {
          userdb
            .addFriendRequest({
              username: decoded.username,
              friend,
              time
            })
            .then(() => {
              res.json({
                success: true,
                message: ''
              });
            });
        } else {
          res.json({
            success: false,
            message: 'Friend Not Exist'
          });
        }
      })
      .catch((e) => {
        console.log(e);
        res.json({
          success: false,
          message: e
        });
      });
  })
});

app.post('/authenticate', (req, res) => {
  const user = req.body;
  userdb
    .checkCredentials(user)
    .then((o) => {
      const token = jwt.sign({ username: user.username }, jwtKey);
      if (o) {
        res.json({
          login: 'success',
          token
        });
      } else {
        res.json({
          login: 'fail',
          token: ''
        });
      }
    })
    .catch((e) => {
      res.json({
        login: 'fail',
        token: ''
      });
    });
});

app.get('/*', (req, res) => {
  res.render(__dirname + '/template/index');
});

io.on('connection', (socket) => {
  const redisCli = createClient();
  console.log('NEW SOCKET CONNECTED: ' + socket.id);

  socket.on('newMessage', (data) => {
    console.log(socket.id);
    socket.emit('received', { messageId: data.messageId });
    console.log(data);
  });

  socket.on('registerLogin', (data) => {
    console.log('SOCKET registerLogin');
    redisCli.subscribe(`pubsub:${data.username}`).then(o => {
      io.to(socket.id).emit('loginSuccessful', data);
    }).catch(e => {
      console.log('error: ' + e);
    });
    redisCli.on('message', (channel, message) => {
      if (channel === `pubsub:${data.username}`) {
        console.log(channel + ': ' + message);
        io.to(socket.id).emit('message', message);
      }
    });
  });

  socket.on('registerLogout', (data) => {
    console.log('registerLogout:' + data.username);
    redisCli.unsubscribe(`pubsub:${data.username}`).then(o => {
      io.to(socket.id).emit('logoutSuccessful', data);
    });
  });

  socket.on('disconnect', () => {
    console.log('SOCKET DISCONNECTED: ' + socket.id);
  });
});


http.listen(config.server.port, () => {
  console.log('Listening on port: 3000');
});


