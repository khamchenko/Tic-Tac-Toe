import React, { Component } from 'react';

import  PlayerItem from './PlayerItem';

import './PlayerList.scss';

class PlayerList extends Component {
  render () {
    const { GameStatistics, GameInfo } = this.props;
    return (
      <div className="player-list-wrapper">
        <div className="title-wrapper">Game ID: {GameInfo.GameID}</div>
        <div className="player-wrapper" >
          {
            GameStatistics.map((elem, i) => {
              let player = elem.player == 1 ? GameInfo.player_1_name : GameInfo.player_2_name;
              return (
                <PlayerItem key={elem.player} player={player} win={elem.win} numPlayer={elem.player}/>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default PlayerList;
