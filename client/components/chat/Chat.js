import React, { Component } from 'react';
import MessageInput from './chatPanel/MessageInput';
import Messages from '../../containers/Messages';
import styles from '../../style/index.css';
import Menu from './menu/Menu';
import Search from './components/Search';
import MessageList from './chatPanel/MessageList';
import Notification from './components/Notification';
import FriendList from './friends/FriendList';

class Chat extends Component {
  render() {
    return (
      <div className = {styles.chat}>
        <div className = {styles.chatLeft}>
          <Menu/>
          <FriendList/>
        </div>
        <div className = {styles.chatRight}>
          <Notification/>
          <div className = {styles.message}>
            <Messages/>
          </div>
          <div className = {styles.messageInput}>
            <MessageInput/>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
