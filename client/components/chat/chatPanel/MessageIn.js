import React, { Component } from 'react';
import styles from '../../../style/chat.css';

class MessageIn extends Component {
  render() {
    return (
      <div className = { styles.singleMessageContainer }>
        <div className = { styles.singleMessage + ' ' + styles.in }>
          { this.props.children }
        </div>
        <div className = { styles.empty }></div>
      </div>
    );
  }
}

export default MessageIn;
