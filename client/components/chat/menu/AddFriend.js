import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../../../style/menuIcon.css';
import Modal from '../components/Modal';
import requestFriend from '../../../actions/requestFriend';

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
              <input type = 'text' placeholder = 'Enter an username...' value = { this.state.friend } onChange = { this.onChange }/>
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

  sendRequest = (e) => {
    e.preventDefault();
    if (this.state.friend !== '') {
      this.props.dispatch(requestFriend(this.state.friend));
    }
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      friend: e.target.value
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
