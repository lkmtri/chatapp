import React, { Component } from 'react';
import { connect } from 'react-redux';
import MessageInput from './chatPanel/MessageInput';
import styles from '../../style/index.css';
import Menu from './menu/Menu';
import Search from './components/Search';
import MessageList from './messages/MessageList';
import Notification from './components/Notification';
import FriendManager from './friends/FriendManager';

class Chat extends Component {
  render() {
    return (
      <div className = {styles.chat}>
        <div className = {styles.chatLeft}>
          <Menu/>
          { this.props.view === 'friend' ? (
              <FriendManager/>
            ) : (
              <MessageList/>
            )
          }
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

const mapStateToProps = (state) => {
  return {
    view: state.view
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

Chat = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default Chat;
