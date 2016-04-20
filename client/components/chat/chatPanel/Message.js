import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div>
        { this.props.type + ' ' + this.props.message }
      </div>
    );
  }
}

export default Message;
