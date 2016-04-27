import React, { Component } from 'react';
import styles from '../../../style/chat.css';
import messages from '../../../actions/messages';

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

  componentDidMount() {
    // console.log(this.props.status);
    if (this.props.status === 'received') {
      // console.log('message read: ' + this.props.friend + ' ' + this.props.children);
      this.props.dispatch(messages.messageRead({
        friend: this.props.friend,
        message: this.props.children,
        time: this.props.time
      }));
    }
  }
}

export default MessageIn;
