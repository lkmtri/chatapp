import React, { Component } from 'react';
import styles from '../../../style/friendRequestItem.css';
import iconStyles from '../../../style/menuIcon.css';

class RequestItem extends Component {
  render() {
    return (
      <div className = { styles.friendRequestItemContainer }>
        <div className = { styles.friendRequestItemUsername }>
          { this.props.username }
        </div>
        <div className = { styles.friendRequestItemActions }>
          <i className = { 'remove icon ' + iconStyles.menuIcon }/>
          <i className = { 'checkmark icon ' + iconStyles.menuIcon }/>
        </div>
      </div>
    );
  }
}

export default RequestItem;
