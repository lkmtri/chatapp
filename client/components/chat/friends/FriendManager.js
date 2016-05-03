import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../style/friendRequestList.css';
import RequestList from './RequestList';
import FriendList from './FriendList';
import AddFriend from './AddFriend';

class FriendManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = { styles.friendRequestContainer }>
        <div className = { styles.friendRequestHeader }>
          Friend Requests
          <div className = { styles.addFriendIcon }>
            <AddFriend/>
          </div>
        </div>
        <div className = { styles.scrollableFriendRequestListWrapper }>
          <div className = { styles.scrollableFriendRequestList }>
            <div className = { styles.friendRequestListContent }>
              <RequestList/>
            </div>
          </div>
        </div>
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

FriendManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendManager);

export default FriendManager;
