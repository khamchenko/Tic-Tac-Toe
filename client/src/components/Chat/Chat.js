import React, { Component } from 'react';
import Textarea from "react-textarea-autosize";

import Messages from './Messages';

import './Chat.scss';
import Send from '../icon/send.svg';

class Chat extends Component {
  constructor(props) {
		super(props);
    this.state = {
      isFocus: false,
      value: ''
    };
    this._SendMessage = this._SendMessage.bind(this);
    this._textarea = this._textarea.bind(this);
	}

  _SendMessage() {
    this.props.SendMessage(this.state.value)
    this.setState({
      value: ''
    })
  }

  _textarea(event) {
    console.log(event.key);
    if (event.key == 'Enter'){
      this._SendMessage()
    }
  }

  render () {
    const { isFocus } = this.state;
    const { GameMessages, Player } = this.props;
    return (
      <div className="chat-wrapper" >
        <div className="messages">
          <Messages GameMessages={GameMessages} Player={Player}/>
        </div>
        <div className='text-wrapper'>
          <div className='text-border'>
            <div className='write'>
              <Textarea
                className='write-input'
                placeholder="Write a message..."
                maxRows={1}
                value={this.state.value}
                onChange={e => this.setState({value: e.target.value})}
                onKeyUp={this._textarea}
              />
            </div>
            <div className='options'>
              <div className='icon-wrapper' onClick={this._SendMessage}>
                <img className="icon" src={Send} alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
