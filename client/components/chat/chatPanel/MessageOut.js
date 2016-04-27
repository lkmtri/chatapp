import React, { Component } from 'react';
import styles from '../../../style/chat.css';

class MessageOut extends Component {
  render() {
    let styleStatus = '';
    if (this.props.status === 'sent') {
      styleStatus = styles.out;
    } else if (this.props.status === 'delivered') {
      styleStatus = styles.outDelivered;
    } else if (this.props.status === 'read') {
      styleStatus = styles.outRead;
    }
    return (
      <div className = { styles.singleMessageContainer }>
        <div className = { styles.empty }></div>
        <div className = { styles.singleMessage + ' ' + styleStatus }>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default MessageOut;
