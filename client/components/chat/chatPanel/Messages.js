import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';

class Messages extends Component {
  render() {
    console.log(this.props.messageList);
    const { active, messages } = this.props.messageList;
    let displayMessages = [];
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].friend === active) {
        displayMessages = messages[i].message;
        break;
      }
    }
    return (
      <div>
        {
          displayMessages.map((e) => {
            return <Message type = { e.type } message = { e.message } time = { e.time }/>
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messageList: state.messageList
  };
}

const mapDispatchToProp = (dispatch) => {
  return {
    dispatch
  };
}

Messages = connect(
  mapStateToProps,
  mapDispatchToProp
)(Messages);

export default Messages;
