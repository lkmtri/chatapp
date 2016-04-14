import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className = { 'ui small modal ' + this.props.keys }>
        <div className = 'header'>
          { this.props.header }
        </div>
        <div className = 'content'>
          { this.props.content }
        </div>
        <div className = 'actions'>
          { this.props.actions }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const key = this.props.keys;
    $('.ui.modal.' + key).modal({detachable: false});
  }

  componentWillUpdate(nextProps) {
    const key = nextProps.keys;
    $('.ui.modal.' + key).modal(nextProps.showModal);
  }
}

export default Modal;
