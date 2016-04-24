import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../style/menuIcon.css';

class PrintStore extends Component {
  render() {
    return (
      <div onClick = { this.onClick }>
        { this.props.children }
      </div>

    );
  }

  onClick = () => {
    const state = this.props.state;
    const messageList = state.messageList.toJS();
    const friendList = state.friendList.toJS();
    const friendRequestList = state.friendRequestList.toJS();
    console.log({
      messageList,
      friendList,
      friendRequestList
    });
  }
}

// <i className = { 'print icon ' + styles.menuIcon } onClick = {this.onClick}/>

const mapStateToProps = (state) => {
  return {
    state: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
}

PrintStore = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrintStore);

export default PrintStore;
