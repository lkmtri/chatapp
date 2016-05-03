import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../style/menuIcon.css';
import view from '../../../actions/view';
import friendRequestNoti from '../../../actions/friendRequestNoti';

class Friends extends Component {
  render() {
    return (
      <div>
        {
          this.props.friendRequestNoti && this.props.view !== 'friend' ? (
            <i className = { 'user icon ' + styles.menuIconWithNoti } onClick = { this.onClick }/>
          ) : (
            <i className = { 'user icon ' + styles.menuIcon } onClick = { this.onClick }/>
          )
        }
      </div>
    );
  }

  onClick = () => {
    this.props.dispatch(friendRequestNoti.disableFriendRequestNoti());
    this.props.dispatch(view.activateFriendRequestView());
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.view,
    friendRequestNoti: state.friendRequestNoti
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

Friends = connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends);

export default Friends;
