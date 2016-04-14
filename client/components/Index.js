import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Chat from './Chat';
import fetchData from '../actions/fetchData';
import LoginSignupPage from './LoginSignupPage';
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
            <div className = { styles.pageLeft }>
            </div>
            <div className = { styles. pageMid }>
              <Chat/>
            </div>
            <div className = { styles.pageRight }>
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
