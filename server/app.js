import express from 'express';
import expressHbs from 'express-handlebars';
import { Server } from 'http';
import socket from 'socket.io';
import bodyParser from 'body-parser';
import config from '../config/config';
import uuid from 'uuid';
import userdb from './users';
import activeSessions from './activeSessions';
import jwt from 'jsonwebtoken';

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
  // console.log('fetchFriendRequest');
  const token = req.body.token;
  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      res.json({
        success: false
      });
    } else {
      // console.log('here');
      userdb
        .getFriendRequest(decoded.username)
        .then((o) => {
          // console.log(o);
          res.json({
            success: true,
            friendRequestList: o
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
            console.log(response);
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
    // console.log('decoded: ' + JSON.stringify(decoded));
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
          console.log('adding new friendRequest');
          userdb
            .addFriendRequest({
              username: decoded.username,
              friend,
              time
            })
            .then(() => {
              console.log('friendRequest added');
              res.json({
                success: true,
                message: ''
              });
            })
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
  console.log('AUTHENTICATE :' + JSON.stringify(user));
  userdb
    .checkCredentials(user)
    .then((o) => {
      const token = jwt.sign({ username: user.username }, jwtKey);
      console.log('Token: ' + token);
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
  console.log('NEW SOCKET CONNECTED: ' + socket.id);

  socket.on('newMessage', (data) => {
    console.log(socket.id);
    socket.emit('received', { messageId: data.messageId });
    console.log(data);
  });

  socket.on('registerLogin', (data) => {
    const newSession = {
      username: data.username,
      socketID: socket.id
    };
    console.log(newSession);
    activeSessions
      .registerLogin(newSession)
      .then((o) => {
        console.log('loginSuccessful');
        console.log('socketID', socket.id);
        io.to(socket.id).emit('loginSuccessful', data);
      })
      .catch((e) => {
        console.log('loginFailed: ' + e);
        socket.emit('loginFailed', data);
      });
  })

  socket.on('registerLogout', (data) => {
    activeSessions
      .registerLogout(socket.id)
      .then((o) => {
        console.log('logoutSuccessful');
        socket.emit('logoutSuccessful', data);
      })
      .catch((e) => {
        io.to(socket.id).emit('logoutFailed', e);
      });
  })

  socket.on('friendRequest', (data) => {
    console.log('request received: ' + JSON.stringify(data));
    userdb
      .addFriendRequest(data)
      .then((o) => {
        console.log(o);
      });
  });

  socket.on('disconnect', () => {
    activeSessions.registerLogout(socket.id);
    console.log('SOCKET DISCONNECTED: ' + socket.id);
  })
});


http.listen(config.server.port, () => {
  console.log('Listening on port: 3000');
});


