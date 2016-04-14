import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class PrivateOnly extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

  componentWillUpdate(nextProps) {
    if (nextProps.user.status !== 'LOGIN_SUCCESSFUL') {
      browserHistory.push('/');
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

PrivateOnly = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateOnly);

export default PrivateOnly;
