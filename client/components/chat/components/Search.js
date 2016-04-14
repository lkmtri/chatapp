import React, { Component } from 'react';
import styles from '../../../style/index.css';

class Search extends Component {
  render() {
    return (
      <div className = {styles.search}>
        <div className="ui fluid icon input">
          <input type="text" placeholder="Search message ..."/>
          <i className="search icon"></i>
        </div>
      </div>
    );
  }
}

export default Search;

