import React, { Component } from 'react';
import styles from '../style/menuIcon.css';

class Friends extends Component {
  render() {
    return (
      <i className = { 'users icon ' + styles.menuIcon } />
    );
  }
}

export default Friends;
