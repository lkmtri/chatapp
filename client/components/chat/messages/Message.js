import React, { Component } from 'react';
import styles from '../../../style/message.css';
import iconStyle from '../../../style/menuIcon.css';

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
        <div className = { styles.removeButton }>
          <i className = { 'trash outline icon ' + iconStyle.menuIcon } onClick = { this.props.deleteMessage }/>
        </div>
      </div>
    );
  }

  onClick = () => {
    this.props.changeActiveChat();
  }
}

export default Message;
