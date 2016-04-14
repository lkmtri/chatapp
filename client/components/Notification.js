import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../style/notification.css';
import notification from '../actions/notification';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      isSuccess: true
    };
  }

  render() {
    const hidden = this.state.isHidden ? styles.hidden : '';
    const success = this.state.isSuccess ? ' success ' : ' negative ';
    return (
      <div className = { styles.notificationContainter }>
        <div className = { styles.notificationLeft }>
        </div>
        <div className = { styles.notificationMid }>
          <div className = { 'ui' + success + 'message ' + styles.messageContainer  + ' ' + hidden }>
            <i className = 'close icon' onClick = { this.closeNotification }></i>
            { this.props.message + ' ' + this.props.data }
          </div>
        </div>
        <div className = { styles.notificationRight }>
        </div>
      </div>
    );
  }

  componentWillUpdate(nextProps) {
    if (nextProps.message !== '') {
      this.state.isHidden = false;
    } else {
      this.state.isHidden = true;
    }
    this.state.isSuccess = nextProps.success;
  }

  closeNotification = (e) => {
    e.preventDefault();
    this.props.dispatch(notification.clearNotification());
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    data: state.notification.data,
    success: state.notification.success
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
}

Notification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

export default Notification;
