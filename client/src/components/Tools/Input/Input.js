import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import './Input.scss';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      prompt: false,
    };
    this.inputChange = this.inputChange.bind(this);
  }

  inputChange(event) {
    this.setState({ value: event.target.value });

    this.props.isChange(this.text.value);

    if (this.text.value == 0) {
      this.setState({ prompt: false });
    } else {
      this.setState({ prompt: true });
    }
  }

  render () {
    const { placeholder } = this.props;
    const { prompt, value } = this.state;
    var timeout = 300;
    var defaultStyle = {
      transition: `opacity ${timeout}ms ease-in-out`,
      opacity: 0,
    };
    var transitionStyles = {
      entering: { opacity: 0 },
      entered:  { opacity: 1 },
    };
    return (
      <div className="root-input">
        <input
          className="input"
          type="text"
          placeholder={placeholder}
          ref={(input) => this.text = input}
          value={value}
          onChange={this.inputChange}
        />
        <Transition in={prompt} timeout={timeout}>
          {(state) => (
            <div
              style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
            >
              <div className="input-prompt">{placeholder}</div>
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

export default Input;
