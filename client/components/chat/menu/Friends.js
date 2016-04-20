import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../style/menuIcon.css';
import view from '../../../actions/view';

class Friends extends Component {
  render() {
    return (
      <i className = { 'user icon ' + styles.menuIcon } onClick = { this.onClick }/>
    );
  }

  onClick = () => {
    this.props.dispatch(view.activateFriendView());
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

Friends = connect(
  mapStateToProps,
  mapDispatchToProps
)(Friends);

export default Friends;
