import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../style/index.css';
import Menu from './menu/Menu';
import MessageList from './messages/MessageList';
import FriendManager from './friends/FriendManager';
import ChatPanel from './chatPanel/ChatPanel';
import Notification from './components/Notification';
import ScrollableFriendMessage from './scrollableFriendMessage/ScrollableFriendMessage';

class Chat extends Component {

  render() {
    return (
      <div className = {styles.chat}>
        <div className = {styles.chatLeft}>
          <Menu/>
          { this.props.view === 'friend_request' ? (
              <FriendManager/>
            ) : (
              <ScrollableFriendMessage/>
            )
          }
        </div>
        {
          this.props.active !== '' ? (
            <ChatPanel/>
          ) : (
            <div className = { styles.chatRightEmpty }>
              <Notification/>
              ChatApp by lkmtri
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.view,
    active: state.messageList.get('active')
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
