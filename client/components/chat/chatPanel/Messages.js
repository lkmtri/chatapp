import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Message from './Message';
import Immutable from 'immutable';
import style from '../../../style/index.css';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageNotification: false
    };
  }

  render() {
    const active = this.props.messageList.get('active');
    const messageList = active === '' ? Immutable.Map({}) : this.props.messageList.get('messages');//.get(active).get(`message`);
    const messages = messageList.get(active) === undefined ? [] : messageList.get(active).get('message');
    const lastMessage = messageList.get(active) === undefined ? '' : messageList.get(active).get('lastMessage').message;
    const notiHidden = this.state.messageNotification ? '' : style.messageNotiHidden;
    return (
      <div className = { style.message }>
        <div ref = { c => this._message = c } onScroll =  { this.onScroll } className = { style.messageScroll }>
          <div ref = { c => this._messageDiv = c } className = { style.messageDiv }>
            {
              messages.map((e) => {
                return <Message
                  type = { e.type }
                  friend = { active }
                  message = { e.message }
                  time = { e.time }
                  key = { e.type + ' ' + e.time }
                  status = { e.status }
                  dispatch = { this.props.dispatch }
                />
              })
            }
          </div>
        </div>
        <div className = { style.messageNotification + ' ' + notiHidden } onClick = { this.displayNewMessage }>
          { 'New Message: ' + lastMessage }
        </div>
      </div>
    );
  }

  componentWillUpdate(nextProps) {
    const nextActive = nextProps.messageList.get('active');
    const thisActive = this.props.messageList.get('active');
    if (thisActive === nextActive && thisActive !== '') {
      // new message
      this.shouldAdjustScroll = this._messageDiv.scrollHeight - this._message.clientHeight - this._message.scrollTop >= 10;
      const lastMessage = nextProps.messageList.get('messages').get(nextActive).get('lastMessage');
      // console.log(lastMessage);
      if (this._messageDiv.scrollHeight - this._message.clientHeight - this._message.scrollTop >= 10 && lastMessage.type === 'in') {
        this.state.messageNotification = true;
      } else {
        this.state.messageNotification = false;
      }
    } else {
      // change active
      this.state.messageNotification = false;
      this.shouldAdjustScroll = false;
     }
  }

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this._message);
    if (this.shouldAdjustScroll) {
      node.scrollTop = this._message.scrollTop;
    } else {
      node.scrollTop = this._messageDiv.scrollHeight - this._message.clientHeight;
    }
  }

  displayNewMessage = () => {
    const node = ReactDOM.findDOMNode(this._message);
    node.scrollTop = this._messageDiv.scrollHeight - this._message.clientHeight;
  }

  onScroll = () => {
    if (this._message.scrollTop === this._messageDiv.scrollHeight - this._message.clientHeight && this.state.messageNotification) {
      this.setState({
        messageNotification: false
      });
    }
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
