import React, { Component } from 'react';
import styles from '../../../style/chat.css';

class MessageOut extends Component {
  render() {
    return (
      <div className = { styles.singleMessageContainer }>
        <div className = { styles.empty }></div>
        <div className = { styles.singleMessage + ' ' + styles.out }>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default MessageOut;
