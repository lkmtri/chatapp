import React, { Component } from 'react';
import styles from '../../../style/message.css';

class Message extends Component {
  render() {
    return (
      <div className = { this.props.selected ? styles.messageSelected : styles.message } onClick = { this.onClick }>
        <div className = { styles.avatar }>
        </div>
        <div className = { styles.content }>
          <div className = { styles.friend }>
            {this.props.friend}
          </div>
          <div className = { styles.lastMessage }>
            {this.props.lastMessage}
          </div>
        </div>
      </div>
    );
  }

  onClick = () => {
    this.props.changeActiveChat();
  }
}

export default Message;
