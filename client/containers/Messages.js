import React, { Component } from 'react';
import Message from '../components/Message';
import { connect } from 'react-redux';

class Messages extends Component {
  render() {
    const messages = this.props.messages;

    // console.log(this.props)

    return (
      <div>
        {
          messages.map(message => {
            return <Message message = {message.message} isSending = {message.status} />
          })
        }
      </div>
    );
  }
}

const mapStateToProps = ({ messages }) => {
  return {
    messages
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

Messages = connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);

export default Messages;
