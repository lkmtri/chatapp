import React, { Component } from 'react';
import MessageIn from './MessageIn';
import MessageOut from './MessageOut';

class Message extends Component {
  render() {
    return (
      <div>
        { this.props.type === 'in' ? (
            <MessageIn>{ this.props.message }</MessageIn>
          ) : (
            <MessageOut>{ this.props.message }</MessageOut>
          )
        }
      </div>
    );
  }
}

export default Message;
