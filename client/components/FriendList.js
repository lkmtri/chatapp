import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../style/friendMenu.css';
import FriendRequestList from './FriendRequestList';

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendActive: true,
      requestActive: false
    };
  }

  render() {
    const friendActive = this.state.friendActive ? styles.friendMenuLeftSelected : '';
    const requestActive = this.state.requestActive ? styles.friendMenuRightSelected : '';
    return (
      <div>
        <div className = { styles.friendMenuContainer }>
          <div className = { styles.friendMenuLeft + ' ' + friendActive } onClick = { this.onClick(1) }>Friends</div>
          <div className = { styles.friendMenuRight + ' ' + requestActive } onClick = { this.onClick(2) }>Requests</div>
        </div>
        { this.state.friendActive ?
          (
            <div></div>
          ) : (
            <FriendRequestList/>
          )
        }
      </div>
    );
  }

  onClick = (i) => {
    if (i === 1)
      return () => {
        if (!this.state.friendActive) {
          this.setState({
            friendActive: true,
            requestActive: false
          });
        }
      }
    return () => {
      if (!this.state.requestActive) {
        this.setState({
          friendActive: false,
          requestActive: true
        });
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    friendList: state.friendList
  };
}


const mapDispatchToProps = (dispatch) => {
  return {};
}

FriendList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendList);

export default FriendList;
