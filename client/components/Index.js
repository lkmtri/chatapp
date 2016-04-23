import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Chat from './chat/Chat';
import fetchData from '../actions/fetchData';
import LoginSignupPage from './login-signup/LoginSignupPage';
import styles from '../style/index.css';

class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        { this.props.user.status === 'LOGIN_SUCCESSFUL' ? (
          <div className = { styles.page }>
            <div className = { styles. pageMid }>
              <Chat/>
            </div>
          </div>
        ) : (
          <LoginSignupPage/>
        )}
      </div>
    );
  }

  componentWillMount() {
    console.log('index componentWillMount');
    this.props.dispatch(fetchData.fetch());
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

Index = connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);

export default Index;
