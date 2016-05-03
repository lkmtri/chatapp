import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from '../../../style/friendMessageContainer.css';
import MessageList from '../messages/MessageList';
import FriendList from '../friends/FriendList';
import view from '../../../actions/view';
import newMessageNoti from '../../../actions/newMessageNoti';

class ScrollableFriendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    return (
      <div className = { style.scrollableFriendMessageContainerWrapper }>
        <div className = { style.scrollableFriendMessageContent }>
          <div className = { style.friendMessageContainer }>
            <div className = { style.searchContainer }>
              <div className = { style.searchInputContainer }>
                <div className = { style.searchIcon }>
                  {
                    this.props.view === 'friend' ? (
                      <i className = { 'chevron left icon ' + style.iconBack } onClick = { this.onClick }></i>
                    ) : (
                      <i className = { 'search icon ' + style.icon }></i>
                    )
                  }
                </div>
                <input value = { this.state.value } onChange = { this.onChange } className= { style.searchInput } type = 'text' placeholder = 'Search friend list..' onFocus = { this.onFocus }/>
              </div>
            </div>
            {
              this.props.view === 'friend' ? (
                <FriendList searchKey = { this.state.value }/>
              ) : (
                <MessageList/>
              )
            }
          </div>
        </div>
      </div>
    );
  }

  componentWillUpdate(nextProps) {
    if (this.props.view === 'friend' && nextProps.view === 'message') {
      this.setState({
        value: ''
      });
      this.props.dispatch(newMessageNoti.disableNewMessageNoti());
    }
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      value: e.target.value
    });
  }

  onClick = () => {
    if (this.props.view === 'friend') {
      this.props.dispatch(view.activateMessageView());
      this.setState({
        value: ''
      });
    }
  }

  onFocus = () => {
    this.props.dispatch(view.activateFriendView());
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.view
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

ScrollableFriendMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScrollableFriendMessage);

export default ScrollableFriendMessage;
