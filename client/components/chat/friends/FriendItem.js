import React, { Component } from 'react';
import styles from '../../../style/friendItem.css';
import iconStyle from '../../../style/menuIcon.css';
import { connect } from 'react-redux';

class FriendItem extends Component {
  render() {
    return (
      <div className = { styles.friendItemContainer }>
        <div className = { styles.friendItemUsername }>
          { this.props.children }
        </div>
        <div className = { styles.friendItemMessageIcon }>
          <i className = { 'write icon ' + iconStyle.menuIcon } onClick = { this.onClick }/>
        </div>
      </div>
    );
  }

  onClick = () => {
    this.props.dispatch({
      type: 'SET_ACTIVE_CHAT',
      friend: this.props.children
    });
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

FriendItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendItem);

export default FriendItem;
