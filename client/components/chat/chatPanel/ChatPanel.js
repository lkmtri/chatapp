import React, { Component } from 'react';
import styles from '../../../style/index.css';
import Notification from '../components/Notification';
import MessageInput from './MessageInput';
import Messages from './Messages';
import ChatHeader from './ChatHeader';

class ChatPanel extends Component {
  render() {
    return (
      <div className = {styles.chatRight}>
        <Notification/>
        <ChatHeader/>
        <div className = {styles.message}>
          <Messages/>
        </div>
        <div className = {styles.messageInput}>
          <MessageInput/>
        </div>
      </div>
    );
  }
}

export default ChatPanel;

