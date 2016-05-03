import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../style/menuIcon.css';
import view from '../../../actions/view';
import newMessageNoti from '../../../actions/newMessageNoti';

class Message extends Component {
  render() {
    return (
      <div>
        {
          this.props.newMessageNoti && this.props.view !== 'message' ? (
            <i className = { 'mail square icon ' + styles.menuIconWithNoti } onClick = { this.onClick }/>
          ) : (
            <i className = { 'mail square icon ' + styles.menuIcon } onClick = { this.onClick }/>
          )
        }
      </div>
    );
  }

  onClick = () => {
    this.props.dispatch(view.activateMessageView());
    this.props.dispatch(newMessageNoti.disableNewMessageNoti());
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.view,
    newMessageNoti: state.messageList.get('newMessageNoti')
  };
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
