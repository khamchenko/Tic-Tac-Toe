import React, { Component } from 'react'
import './MessageItem.scss';

import CheckMark from '../../../icon/check-mark.svg';

export default class MessageItem extends Component {
	render() {
		const { author, message, date, Player, player_id } = this.props;
		return (
			<div className='message-wrapper'>
				<div className={Player.playersID == player_id ? "message-root" : "message-root message-from"}>
					<div>
						<div className="message-author">
							<div className="author">{author}</div>
						</div>
		        <div className="message-text">{message}</div>
		        <div className="message-CheckMark">
		          <img className="icon" src={CheckMark} alt='' />
		        </div>
					</div>
					<div className="date">
						{`${new Date(date).getHours()}:${new Date(date).getMinutes()}`  }
					</div>
				</div>
			</div>
		)
	}
}
