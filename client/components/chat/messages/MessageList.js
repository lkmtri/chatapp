import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.messageList.map((e) => {
            return (
              <Message
                friend = { e.friend }
                lastMessage = { e.lastMessage.message }
                key = { e.friend }
                changeActiveChat = { this.changeActiveChat(e.friend) }
                selected = { this.props.selected === e.friend ? true : false }
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
    selected: state.messageList.active,
    messageList: state.messageList.messages
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
