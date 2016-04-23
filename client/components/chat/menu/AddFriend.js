import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../style/menuIcon.css';
import Modal from '../components/Modal';
import request from '../../../actions/requestFriend';

class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: '',
      friend: '',
    };
  }

  render() {
    return (
      <div>
        <i className = { 'add user icon ' + styles.menuIcon } onClick = { this.openModal }/>
        <Modal
          keys = 'AddFriend'
          header = 'Add a Friend'
          content = {
            <div className = 'ui fluid input'>
              <input type = 'text' placeholder = 'Enter an username...' value = { this.state.friend } onChange = { this.onChange } onKeyPress = { this.onKeyPress }/>
            </div>
          }
          actions = {
            <div>
              <div className = 'ui black deny button'>Cancel</div>
              <div className = 'ui teal approve button' onClick = { this.sendRequest }>AddFriend</div>
            </div>
          }
          showModal = { this.state.openModal }
        />
      </div>
    );
  }

  onKeyPress = (e) => {
    e.persist();
    if (e.key === 'Enter') {
      this.closeModal();
      this.sendRequest();
    }
  }

  sendRequest = () => {
    if (this.state.friend !== '') {
      this.props.dispatch(request.requestFriend(this.state.friend));
    }
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      friend: e.target.value
    });
  }

  closeModal = () => {
    this.setState({
      friend: '',
      openModal: 'hide'
    });
  }

  openModal = (e) => {
    e.preventDefault();
    this.setState({
      friend: '',
      openModal: 'show'
    });
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

AddFriend = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFriend);

export default AddFriend;
