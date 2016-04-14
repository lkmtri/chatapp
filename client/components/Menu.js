import React, { Component } from 'react';
import styles from '../style/index.css';
import Avatar from './Avatar';
import Logout from './Logout';
import AddFriend from './AddFriend';
import PrintStore from './PrintStore';
import Friends from './Friends';

class Menu extends Component {
  render() {
    return (
      <div className = {styles.menu}>
        <div>
          <Avatar/>
        </div>
        <div className = {styles.menuRight}>
          <Logout>Log out</Logout>
          <AddFriend/>
          <Friends/>
          <PrintStore/>
        </div>
      </div>
    );
  }
}

export default Menu;