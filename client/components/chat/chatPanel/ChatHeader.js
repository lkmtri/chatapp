import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../style/index.css';

class ChatHeader extends Component {
  render() {
    return (
      <div className = { styles.chatHeader }>
        { this.props.activeChat }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeChat: state.messageList.active
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

ChatHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatHeader);


export default ChatHeader;
