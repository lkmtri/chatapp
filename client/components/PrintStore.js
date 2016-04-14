import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../style/menuIcon.css';
class PrintStore extends Component {
  render() {
    return (
      <i className = { 'print icon ' + styles.menuIcon } onClick = {this.onClick}/>
    );
  }

  onClick = () => {
    console.log(this.props.state);
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
}

PrintStore = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrintStore);

export default PrintStore;
