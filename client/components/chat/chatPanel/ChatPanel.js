import React, { Component } from 'react';
import styles from '../../../style/index.css';
import Notification from '../components/Notification';
import MessageInput from './MessageInput';
import Messages from './Messages';
import ChatHeader from './ChatHeader';
import { connect } from 'react-redux';

class ChatPanel extends Component {
  render() {
    return (
      <div className = {styles.chatRight}>
        <Notification/>
        <ChatHeader/>
        <Messages/>
        <div className = {styles.messageInput}>
          <MessageInput/>
        </div>
      </div>
    );
  }
}

export default ChatPanel;

