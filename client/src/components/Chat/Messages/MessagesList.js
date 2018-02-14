import React, { Component } from 'react';

import './Messages.scss';

import MessageItem from './MessageItem';

class MessagesList extends Component {
  constructor(props) {
    super(props);
  }

  scrollToBottom() {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render () {
    const { GameMessages, Player } = this.props;
    return (
      <div className="root-Messages" ref={(div) => { this.messageList = div }}>
          {
            GameMessages.map((elem, id) => {
              return(
                <MessageItem
                  key={id} {...elem}
                  Player={Player}
                />
              );
            })
          }
      </div>
    );
  }
}

export default MessagesList;
