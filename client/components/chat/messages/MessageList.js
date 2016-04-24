import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import styles from '../../../style/message.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messageList = this.props.messageList.get('messages').sort((a, b) => {
      const aLastMes = a.get('lastMessage');
      const bLastMes = b.get('lastMessage');
      if (aLastMes.time > bLastMes.time) {
        return -1;
      } else if (aLastMes.time === bLastMes.time) {
        return 0;
      } else {
        return 1;
      }
    });
    const selected = this.props.messageList.get('active');

    return (
      <div>
        <div className = { styles.messageHeader }>
          Messages
        </div>
        {
          messageList.keySeq().map((e) => {
            return (
              <Message
                friend = { e }
                lastMessage = { messageList.get(e).get('lastMessage').message }
                key = { e }
                changeActiveChat = { this.changeActiveChat(e) }
                selected = { selected === e ? true : false }
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
