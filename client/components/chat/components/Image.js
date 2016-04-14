import React, {Component} from 'react';

export default class Image extends Component {
  render() {
    let {mode, src, height, width, ...props} = this.props;
    let modes = {
      'fill': 'cover',
      'fit': 'contain'
    };
    let size = modes[mode] || 'contain';
    let style = {
      height,
      width
    };
    let important = {
      backgroundImage: `url("${src}")`,
      backgroundSize: size,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat'
    };

    return <div {...props} style={{...style, ...important}} />
  }
}
