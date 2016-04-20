import React, { Component } from 'react';
import MessageInput from './chatPanel/MessageInput';
import styles from '../../style/index.css';
import Menu from './menu/Menu';
import Search from './components/Search';
import MessageList from './chatPanel/MessageList';
import Notification from './components/Notification';
import FriendManager from './friends/FriendManager';

class Chat extends Component {
  render() {
    return (
      <div className = {styles.chat}>
        <div className = {styles.chatLeft}>
          <Menu/>
          <FriendManager/>
        </div>
        <div className = {styles.chatRight}>
          <Notification/>
          <div className = {styles.message}>
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
