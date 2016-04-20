import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendItem from './FriendItem';

class FriendList extends Component {
  render() {
    return (
      <div>
        {
          this.props.friendList.map((e) => {
            return <FriendItem key = { e }>{ e }</FriendItem>
          })
        }
      </div>
    );
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
