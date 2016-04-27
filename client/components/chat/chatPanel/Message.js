import React, { Component } from 'react';
import MessageIn from './MessageIn';
import MessageOut from './MessageOut';

class Message extends Component {
  render() {
    return (
      <div>
        { this.props.type === 'in' ? (
            <MessageIn
              status = { this.props.status }
              dispatch = { this.props.dispatch }
              friend = { this.props.friend }
              time = { this.props.time }
            >
              { this.props.message }
            </MessageIn>
          ) : (
            <MessageOut
              status = { this.props.status }
              time = { this.props.time }
            >
              { this.props.message }
            </MessageOut>
          )
        }
      </div>
    );
  }
}

export default Message;
