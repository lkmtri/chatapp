import React, { Component } from 'react';
import { connect } from 'react-redux';
import RequestItem from './RequestItem';

class RequestList extends Component {
  render() {
    return (
      <div>
        {
          this.props.friendRequestList.map((e) => {
            return <RequestItem username = { e } key = { e }/>
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

RequestList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestList);

export default RequestList;
