import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../style/menuIcon.css';
import view from '../../../actions/view';

class Message extends Component {
  render() {
    return (
      <i className = { 'mail outline icon ' + styles.menuIcon } onClick = { this.onClick }/>
    );
  }

  onClick = () => {
    this.props.dispatch(view.activateMessageView());
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

Message = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default Message;
