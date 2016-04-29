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

const mapStateToProps = (state) => {
  return {
    activeChat: state.messageList.get('active')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

ChatPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPanel);

export default ChatPanel;

