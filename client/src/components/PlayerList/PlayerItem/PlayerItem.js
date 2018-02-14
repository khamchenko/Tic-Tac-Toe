import React, { Component } from 'react';

import LoaderImg from '../../icon/Loader.svg';
import './PlayerItem.scss';

export default class PlayerItem extends Component {
	render() {
		const { win, player , numPlayer} = this.props;
		var NamePlayer =  player ? player : null
		return (
			<div className="player-root">
				{ NamePlayer &&
					<div>
						<div className="player">Player: {numPlayer}</div>
						<div className="name">{NamePlayer}</div>
						<div className="win">{win}</div>
					</div>
				}
				{
					!NamePlayer &&
					<div className="loader-player">
						<img className="icon" src={LoaderImg} alt=""/>
					</div>
				}
			</div>
		)
	}
}
