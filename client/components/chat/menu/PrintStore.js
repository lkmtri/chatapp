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
    state.messageList = state.messageList.toJS();
    state.friendList = state.friendList.toJS();
    state.friendRequestList = state.friendRequestList.toJS();
    console.log(this.props.state);
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
