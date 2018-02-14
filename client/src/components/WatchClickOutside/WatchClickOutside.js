import React, { Component } from 'react';

export default class WatchClickOutside extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    document.body.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClick);
  }

  handleClick(event) {
    const {container} = this.refs;
    const {onClickOutside} = this.props;
    const {target} = event;
    if (typeof onClickOutside !== 'function') {
      return;
    }
    if (target !== container && !container.contains(target)) {
      onClickOutside(event);
    }
  }

  render() {
    return (
      <div ref="container">
        {this.props.children}
      </div>
    );
  }
}
