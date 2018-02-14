import React, { Component } from 'react';

import LoaderImg from '../../icon/Loader.svg';
import './PlayerItem.scss';

export default class PlayerItem extends Component {
	render() {
		const { win, player , numPlayer, right_of_play} = this.props;
		var NamePlayer =  player ? player : null
		let active = right_of_play == (numPlayer - 1) ? false : true
		console.log(numPlayer);
		return (
			<div className="player-root active">
				{ NamePlayer &&
					<div>
						<div className={active ? "player active" : "player"}>Player: {numPlayer}</div>
						<div className={active ? "name active" : "name"}>{NamePlayer}</div>
						<div className={active ? "win activeWin" : "win"}>{win}</div>
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
