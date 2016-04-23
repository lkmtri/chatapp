import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../style/index.css';
import Menu from './menu/Menu';
import MessageList from './messages/MessageList';
import FriendManager from './friends/FriendManager';
import ChatPanel from './chatPanel/ChatPanel';

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
        <ChatPanel/>
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
