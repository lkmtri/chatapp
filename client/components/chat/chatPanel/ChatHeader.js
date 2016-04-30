import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../style/index.css';
import iconStyle from '../../../style/menuIcon.css';
import messageAction from '../../../actions/messages';

class ChatHeader extends Component {
  render() {
    return (
      <div className = { styles.chatHeader }>
        <div className = { styles.chatHeaderUsername }>
          { this.props.activeChat }
        </div>
        <div className = { styles.chatHeaderAction }>
          <i className = { 'trash outline icon ' + iconStyle.menuIcon } onClick = { this.deleteMessage }/>
        </div>
      </div>
    );
  }

  deleteMessage = () => {
    this.props.dispatch(messageAction.deleteMessage(this.props.activeChat));
  }
}

const mapStateToProps = (state) => {
  return {
    activeChat: state.messageList.get('active')
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
