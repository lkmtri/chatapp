import React, { Component } from 'react';

class Message extends Component {
  render() {
    if (this.props.isSending === 'MESSAGE_SENDING') {
      return (
        <p>Sending: {this.props.message}</p>
      );
    } else {
      return (
        <p>{this.props.message}</p>
      );
    }
  }
}

export default Message;
