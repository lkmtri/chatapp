import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';

class Messages extends Component {
  render() {
    const active = this.props.messageList.get('active');
    const messages = active === '' ? [] : this.props.messageList.get('messages').get(active).get(`message`);
    return (
      <div>
        {
          messages.map((e) => {
            return <Message type = { e.type } message = { e.message } time = { e.time } key = { e.time }/>
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messageList: state.messageList
  };
}

const mapDispatchToProp = (dispatch) => {
  return {
    dispatch
  };
}

Messages = connect(
  mapStateToProps,
  mapDispatchToProp
)(Messages);

export default Messages;
