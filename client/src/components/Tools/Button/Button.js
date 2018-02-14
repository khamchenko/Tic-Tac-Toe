import React, { Component } from 'react';

import './Button.scss';

class Button extends Component {
  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }
  buttonClick(){
    this.props.isClick();
  }

  render () {
    const { content, active } = this.props;
    return (
      <div className="root-button">
        <button className={active ? 'button button-active' : 'button'} onClick={this.buttonClick}>{content}</button>
      </div>
    );
  }
}

export default Button;
