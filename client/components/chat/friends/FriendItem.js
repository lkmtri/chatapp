import React, { Component } from 'react';
import styles from '../../../style/friendItem.css';
import iconStyle from '../../../style/menuIcon.css';
import { connect } from 'react-redux';

class FriendItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false
    };
  }

  render() {
    const hidden = !this.state.isMouseOver ? iconStyle.menuIconHidden : '';
    // console.log(hidden);
    return (
      <div className = { styles.friendItemContainer } onMouseEnter = { this.onMouseEnter } onMouseLeave = { this.onMouseLeave }>
        <div className = { styles.friendItemUsername }>
          { this.props.children }
        </div>
        <div className = { styles.friendItemMessageIcon }>
          <i className = { 'mail square icon ' + iconStyle.menuIcon + ' ' + hidden } onClick = { this.onClick }/>
        </div>
      </div>
    );
  }

  onMouseEnter = () => {
    // console.log('onMouseEnter');
    this.setState({
      isMouseOver: true
    });
  }

  onMouseLeave = () => {
    // console.log('onMouseLeave');
    this.setState({
      isMouseOver: false
    });
  }

  onClick = () => {
    this.props.dispatch({
      type: 'SET_ACTIVE_CHAT',
      friend: this.props.children
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

FriendItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendItem);

export default FriendItem;
