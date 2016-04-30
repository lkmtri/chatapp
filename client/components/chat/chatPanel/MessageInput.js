import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
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
        <input
          value = {this.state.message}
          ref = {(e) => this._input = e }
          placeholder = 'Enter your message ...'
          onChange = {this.onChange}
          onKeyPress = { this.onKeyPress }
        />
        <button className = 'ui teal button' onClick = { this.onSubmit }>Send</button>
      </div>
    );
  }

  onChange = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  onKeyPress = (e) => {
    e.persist();
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  componentDidMount() {
    this._input.focus();
  }

  componentDidUpdate() {
    this._input.focus();
  }

  onSubmit = () => {
    const { dispatch, activeChat } = this.props;
    if (activeChat !== '' && this.state.message !== '') {
      dispatch(composeMessage(activeChat, this.state.message));
    }
    this.setState({
      message: ''
    });
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

MessageInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput);

export default MessageInput;
