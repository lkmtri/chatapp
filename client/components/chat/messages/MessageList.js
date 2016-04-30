import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import styles from '../../../style/message.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messageList = this.props.messageList.get('messages');
    const selected = this.props.messageList.get('active');
    const sortedMessageList = messageList.sort((a, b) => {
      const lastMesA = a.get('lastMessage');
      const lastMesB = b.get('lastMessage');
      if (lastMesA.time > lastMesB.time) {
        return -1;
      } else if (lastMesA.time === lastMesB.time) {
        return 0;
      } else {
        return 1;
      }
    });
    return (
      <div>
        <div className = { styles.messageHeader }>
          Messages
        </div>
        {
          sortedMessageList.keySeq().map((e) => {
            return (
              <Message
                friend = { e }
                lastMessage = { messageList.get(e).get('lastMessage').message }
                key = { e }
                changeActiveChat = { this.changeActiveChat(e) }
                selected = { selected === e ? true : false }
                unreadCount = { messageList.get(e).get('unreadCount') }
              />
            );
          })
        }
      </div>
    );
  }



  changeActiveChat = (friend) => {
    return () => {
      this.props.dispatch({
        type: 'SET_ACTIVE_CHAT',
        friend
      });
    };
  }
}

const mapStateToProps = (state) => {
  return {
    messageList: state.messageList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

MessageList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);

export default MessageList;
