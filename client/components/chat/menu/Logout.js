import React, { Component } from 'react';
import { connect } from 'react-redux';
import user from '../../../actions/users';
import { Link } from 'react-router';
import styles from '../../../style/menuIcon.css';
import Modal from '../components/Modal';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: ''
    };
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }

  logout = (e) => {
    e.preventDefault();
    this.props.dispatch(user.logout(this.props.user));
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
