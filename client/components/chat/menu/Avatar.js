import React, { Component } from 'react';
require('identicon.js');
import { connect } from 'react-redux';
import Image from '../components/Image';
import styles from '../../../style/index.css';
import PrintStore from './PrintStore';

class Avatar extends Component {
  render() {
    // console.log('username ' + this.props.user.username);
    const avatar = new Identicon(this.props.user.username, 49).toString();
    return (
      <div className = { styles.menuLeft }>
        <Image mode = 'fit' width = { 49 } height = { 49 } src = { 'data::image/png;base64,' + avatar }/>
        <div style = {{ paddingLeft: '10px', fontWeight: 'bold', fontSize: '16px' }}>
          <PrintStore>
            { this.props.user.username }
          </PrintStore>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

Avatar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);

export default Avatar;
