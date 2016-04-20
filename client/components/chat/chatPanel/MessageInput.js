import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { composeMessage } from '../../../actions/messages';

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  render = () => {
    return (
      <div className = 'ui fluid action input'>
        <input value = {this.state.message} placeholder = 'Enter your message ...' onChange = {this.onChange}/>
        <button className = 'ui teal button' onClick = { this.onSubmit }>Send</button>
      </div>
    );
  }

  onChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { dispatch, activeChat } = this.props;
    if (activeChat !== '') {
      dispatch(composeMessage(activeChat, this.state.message));
    }
    this.setState({
      message: ''
    });
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

MessageInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput);

export default MessageInput;
