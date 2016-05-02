import React, { Component } from 'react';
import styles from '../../../style/message.css';
import messages from '../../../actions/messages';
const Identicon = require('identicon.js');
import jsSHA from 'jssha';
import Image from '../components/Image';

class Message extends Component {
  render() {
    const shaObj = new jsSHA('SHA-512', 'TEXT');
    shaObj.update(this.props.friend);
    const avatar = new Identicon(shaObj.getHash('HEX'), 45).toString();
    return (
      <div className = { this.props.selected ? styles.messageSelected : styles.message } onClick = { this.onClick }>
        <div className = { styles.avatar }>
          <Image mode = 'fit' width = { 45 } height = { 45 } src = { 'data::image/png;base64,' + avatar }/>
        </div>
        <div className = { styles.content }>
          <div className = { styles.friend }>
            {this.props.friend}
          </div>
          <div className = { styles.lastMessage }>
            { this.props.lastMessage }
          </div>
        </div>
        {
          this.props.unreadCount > 0 ? (
            <div className = { styles.unreadCountContainer }>
              <div className = { styles.unreadCount }>
                { this.props.unreadCount }
              </div>
            </div>
          ) : (
            <div></div>
          )
        }
      </div>
    );
  }

  onClick = () => {
    this.props.changeActiveChat();
  }
}

export default Message;
