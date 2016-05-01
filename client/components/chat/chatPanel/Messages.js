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

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.messageNotification !== nextState.messageNotification) {
      return true;
    }
    const thisActive = this.props.messageList.get('active');
    const nextActive = nextProps.messageList.get('active');
    if (thisActive !== nextActive) {
      return true;
    }
    const prev = this.props.messageList.get('messages').get(thisActive);
    if (prev === undefined) {
      return true;
    }
    const prevLast = this.props.messageList.get('messages').get(thisActive).get('message');
    const nextLast = nextProps.messageList.get('messages').get(nextActive).get('message');

    const prevLastMes = prevLast.get(prevLast.size - 1);
    const nextLastMes = nextLast.get(nextLast.size - 1);
    if (prevLastMes.time !== nextLastMes.time || prevLastMes.status !== nextLastMes.status) {
      return true;
    } else {
      return false;
    }
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this._message);
    node.scrollTop = this._messageDiv.scrollHeight - this._message.clientHeight;
  }

  componentWillUpdate(nextProps) {
    const nextActive = nextProps.messageList.get('active');
    const thisActive = this.props.messageList.get('active');

    if (thisActive === nextActive && thisActive !== '') {
      this.shouldAdjustScroll = this._messageDiv.scrollHeight - this._message.clientHeight - this._message.scrollTop >= 10;
      const lastMes = nextProps.messageList.get('messages').get(nextActive).get('lastMessage');
      if (this._messageDiv.scrollHeight - this._message.clientHeight - this._message.scrollTop >= 10 && lastMes.type === 'in') {
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
