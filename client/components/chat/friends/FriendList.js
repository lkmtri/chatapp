import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendItem from './FriendItem';
import style from '../../../style/friendMessageContainer.css';

class FriendList extends Component {
  render() {
    return (
      <div className = { style.friendListContainer }>
        <div style = {{ padding: '5px', backgroundColor: '#f6f7f8', color: '#bebebe', paddingLeft: '10px' }}>
          Friends
        </div>
        {
          this.props.friendList.map((e) => {
            if (e.match(new RegExp(this.props.searchKey, 'i'))) {
              return <FriendItem key = { e }>{ e }</FriendItem>;
            }
            return null;
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
