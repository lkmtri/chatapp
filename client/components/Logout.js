import React, { Component } from 'react';
import PrivateOnly from './PrivateOnly';
import { connect } from 'react-redux';
import user from '../actions/users';
import { Link } from 'react-router';
import styles from '../style/menuIcon.css';
import Modal from './Modal';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: ''
    };
  }

  render() {
    return (
      <PrivateOnly>
        <i className = {'sign out icon ' + styles.menuIcon}  onClick = {this.onClick}/>
        <Modal
          keys = 'Logout'
          header = 'Sure to logout?'
          content = {
            <p>Please click Logout to confirm.</p>
          }
          actions = {
            <div>
              <div className = 'ui black deny button'>Cancel</div>
              <div className = 'ui teal approve button' onClick = { this.logout }>Logout</div>
            </div>
          }
          showModal = { this.state.openModal }
        />
      </PrivateOnly>
    );
  }

  logout = (e) => {
    e.preventDefault();
    this.props.dispatch(user.logout());
  }

  onClick = (e) => {
    e.preventDefault();
    this.setState({
      openModal: 'show'
    });
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

Logout = connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);

export default Logout;
