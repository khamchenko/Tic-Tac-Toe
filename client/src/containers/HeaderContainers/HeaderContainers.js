import React, { Component } from 'react';

import Header from '../../components/Header'
import './Header.scss';

class HeaderContainers extends Component {
  render() {
    return (
      <div className="header-root">
        <Header />
      </div>
    );
  }
}

export default HeaderContainers;
