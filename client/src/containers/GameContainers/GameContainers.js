import React, { Component } from 'react';
import { connect } from 'react-redux';
import Clipboard from 'react-clipboard.js';

import './Game.scss';

import GamePage from '../../components/GamePage';
import Chat from '../../components/Chat';
import PlayerList from '../../components/PlayerList';
import Input from '../../components/Tools/Input';
import Button from '../../components/Tools/Button';
import WatchClickOutside from '../../components/WatchClickOutside';

import { onConnectGame, updateGameField, onSendMessage } from '../../socket-io/StartGame';

class GameContainers extends Component {
  constructor(props) {
		super(props);
    this.state = {
      ActiveStart: false,
      ActivePopup_Player_1: true,
      ActivePopup_Player_2: true,
      GameID: '',
      NamePlayer: '',
      CopyLink: false,
    }
    this.startLink = true;
    this._isStartGame = this._isStartGame.bind(this);
    this._SendMessage = this._SendMessage.bind(this);
    this._isCopyLink = this._isCopyLink.bind(this);
    this._offPopUpPlayer_1 = this._offPopUpPlayer_1.bind(this);
    this._offPopUpPlayer_2 = this._offPopUpPlayer_2.bind(this);
	}

  componentDidMount() {
    const { GameInfo } = this.props;

    var GameID = location.pathname.substr(6);

    if (!GameInfo.data.player_id_1) {
      this.setState({
        GameID: GameID,
        ActivePopup_Player_1: false,
        ActivePopup_Player_2: true,
      })
    }
  }

  componentDidUpdate() {
    const { GameInfo } = this.props;
    if (GameInfo.data.player_id_1) {
      this.startLink = false
    }
  }

  _isChangeName (value) {
    if (value) {
      this.setState({
        ActiveStart: true,
        NamePlayer: value
      })
    } else {
      this.setState({
        ActiveStart: false,
        NamePlayer: ''
      })
    }
  }
  _isStartGame() {
    const { ActiveStart, NamePlayer, GameID } = this.state;
    const { isConnectGameToLink } = this.props;
    ActiveStart && isConnectGameToLink(GameID, NamePlayer);
  }

  _SendMessage(message) {
    const { SendMessage, Player } = this.props;
    var author = Player.data.NamePlayer;
    if (message) {
      SendMessage(message, author)
    }
  }
  _isCopyLink() {
    this.setState({
      CopyLink: true
    })
  }
  _offPopUpPlayer_1() {
    this.setState({
      ActivePopup_Player_1: false
    })
  }
  _offPopUpPlayer_2() {
    this.setState({
      ActivePopup_Player_2: false
    })
  }

  render() {
    const {
      GameField,
      Player,
      GameInfo,
      GameStatistics,
      GameFieldElement,
      GameMessages,
      Notice,
      ActiveNotice
    } = this.props;

    const {
      ActiveStart,
      CopyLink,
      ActivePopup_Player_1,
      ActivePopup_Player_2
    } = this.state;

    return (
      <div className="game-root">
        <div className="container">
          <div className="row game-wrapper">
            <div className="col-md-8 col-sm-12 col-xs-12">
              <GamePage
                isCreateFieldElement={GameFieldElement}
                GameFieldData={GameField.data}
              />
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12">
              <div className="connect-player">
                <PlayerList
                  GameInfo={GameInfo.data}
                  GameStatistics={GameStatistics.data}
                />
              </div>
              <div className="chat">
                <Chat GameMessages={GameMessages.data}
                  SendMessage={this._SendMessage}
                  Player={Player.data}
                />
              </div>
            </div>
          </div>
        </div>
        {
          this.startLink && ActivePopup_Player_2 &&
          <div className="pop-up">
            <WatchClickOutside onClickOutside={this._offPopUpPlayer_2} >
              <div className="pop-up-wrapper">
                <Input type="text" placeholder="Name Player 2" isChange={(value) => this._isChangeName(value)} />
                <Button content="Start Game" active={ActiveStart} isClick={this._isStartGame}/>
                {
                  ActiveNotice &&
                  <div>
                    {
                      Notice.map((item, i) => {
                        return (
                          <div key={item.id} className='notice-root'>{item.Notice}</div>
                        )
                      })
                    }
                  </div>
                }
              </div>
            </WatchClickOutside>
          </div>
        }
        { ActivePopup_Player_1 &&
          <div className="pop-up">
            <WatchClickOutside onClickOutside={this._offPopUpPlayer_1} >
              <div className="pop-up-wrapper">
                <div className="wrapper">
                  <div className="text">Give a link to the second player</div>
                  <div className="link">{location.href}</div>
                  <div className="copy">
                    <Clipboard data-clipboard-text={location.href} onSuccess={this._isCopyLink}>
                      Copy Link
                    </Clipboard>
                    {
                      CopyLink && <div className="clipboard">Copied</div>
                    }
                  </div>
                </div>
              </div>
            </WatchClickOutside>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ( { GameField, GameMessages, GameInfo, GameStatistics, Player, Notice } ) => {
  return {
    GameField: GameField,
    GameMessages: GameMessages,
    GameInfo: GameInfo,
    GameStatistics: GameStatistics,
    Player: Player,
    Notice: Notice.data,
    ActiveNotice: Notice.active,
  }
};
 const mapDispatchToProps = (dispatch) => {
   return {
     isConnectGameToLink: (GameID, NamePlayer) => {
       dispatch(onConnectGame(GameID, NamePlayer));
     },
     GameFieldElement: (i,j) => {
       dispatch(updateGameField(i,j));
     },
     SendMessage: (message, author) => {
       dispatch(onSendMessage(message, author));
     }
   }
 };

export default connect(mapStateToProps, mapDispatchToProps )(GameContainers);
