import React, { Component } from 'react';
import { Link } from 'react-router';

class PageNotFound extends Component {
  render() {
    return (
      <div>
        <p>404</p>
        <p><Link to = '/'>Back to Home</Link></p>
      </div>
    );
  }
}

export default PageNotFound;
