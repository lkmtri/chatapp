import React, { Component } from 'react';
import styles from '../../../style/index.css';
import Avatar from './Avatar';
import Logout from './Logout';
import PrintStore from './PrintStore';
import Friends from './Friends';
import Message from './Message';

class Menu extends Component {
  render() {
    return (
      <div className = {styles.menu}>
        <div>
          <Avatar/>
        </div>
        <div className = {styles.menuRight}>
          <Logout>Log out</Logout>
          <Friends/>
          <Message/>
        </div>
      </div>
    );
  }
}

export default Menu;
