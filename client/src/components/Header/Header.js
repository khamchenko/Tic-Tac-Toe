import React, { Component } from 'react';

import './Header.scss';

class Header extends Component {

  render() {
    return(
      <div className="container">
        <div className="row ">
          <div className="col-lg-5 col-md-12 header-title">
            TIC TAC TOE
          </div>
          {/* <div className="col-lg-5 col-md-12 header-title">
            EXIT
          </div> */}
        </div>
      </div>
    )
  }
};

export default Header;
