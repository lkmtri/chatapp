import React, { Component } from 'react';
import styles from '../../../style/friendRequestItem.css';
const Identicon = require('identicon.js');
import jsSHA from 'jssha';
import Image from '../components/Image';

class RequestItem extends Component {
  render() {
    const shaObj = new jsSHA('SHA-512', 'TEXT');
    shaObj.update(this.props.username);
    const avatar = new Identicon(shaObj.getHash('HEX'), 45).toString();
    return (
      <div className = { styles.friendRequestItemContainer }>
        <div className = { styles.friendRequestItemAvatar }>
          <Image mode = 'fit' width = { 45 } height = { 45 } src = { 'data::image/png;base64,' + avatar }/>
        </div>
        <div className = { styles.friendRequestItemUsername }>
          { this.props.username }
        </div>
        <div className = { styles.friendRequestItemActions }>
          <i className = { 'remove circle icon ' + styles.declineMenuIcon } onClick = { this.props.onDecline }/>
          <i className = { 'check circle icon ' + styles.acceptMenuIcon } onClick = { this.props.onAccept }/>
        </div>
      </div>
    );
  }
}

export default RequestItem;
