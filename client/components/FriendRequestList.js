import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendRequestItem from './FriendRequestItem';

class FriendRequestList extends Component {
  render() {
    return (
      <div>
        {
          this.props.friendRequestList.map((e) => {
            return <FriendRequestItem username = { e } key = { e }/>
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friendRequestList: state.friendRequestList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

FriendRequestList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendRequestList);

export default FriendRequestList;
