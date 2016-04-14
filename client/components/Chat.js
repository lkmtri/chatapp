import React, { Component } from 'react';
import MessageInput from './MessageInput';
import Messages from '../containers/Messages';
import styles from '../style/index.css';
import Menu from './Menu';
import Search from './Search';
import MessageList from './MessageList';
import Notification from './Notification';
import FriendList from './FriendList';

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
