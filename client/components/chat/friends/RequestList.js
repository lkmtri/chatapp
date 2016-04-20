import React, { Component } from 'react';
import { connect } from 'react-redux';
import RequestItem from './RequestItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import request from '../../../actions/requestFriend';

class RequestList extends Component {
  render() {
    return (
      <ReactCSSTransitionGroup transitionName = 'friendRequestList' transitionEnterTimeout = { 500 } transitionLeaveTimeout = { 300 }>
        {
          this.props.friendRequestList.map((e) => {
            return <RequestItem username = { e } key = { e } onAccept = { this.handleAccept(e) } onDecline = { this.handleDecline(e) }/>
          })
        }
      </ReactCSSTransitionGroup>
    );
  }

  handleAccept = (e) => {
    return () => {
      this.props.dispatch(request.acceptFriendRequest(e));
    };
  }

  handleDecline = (e) => {
    return () => {
      this.props.dispatch(request.declineFriendRequest(e));
    };
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

RequestList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestList);

export default RequestList;
