import React, { Component } from 'react';
import Input from '../Tools/Input';
import Button from '../Tools/Button';
import './Menu.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ActiveStart: false,
      // ActiveConnect: false,
      NamePlayer: '',
      GameID: '',
    }
    this._isChangeName = this._isChangeName.bind(this);
    // this._isChangeConnect = this._isChangeConnect.bind(this);
    this._isStartGame = this._isStartGame.bind(this);
    // this._isConnectGame = this._isConnectGame.bind(this);
    this._handleSubmitStart = this._handleSubmitStart.bind(this);
    // this._handleSubmitConnect = this._handleSubmitConnect.bind(this);
  }
  _isChangeName (value) {
    const { GameID } = this.state;
    if (value) {
      this.setState({ ActiveStart: true, NamePlayer: value })
    } else {
      this.setState({ ActiveStart: false, NamePlayer: ''})
      // this.setState({ ActiveStart: false, ActiveConnect: false, NamePlayer: ''})
    }
    // if (value.length !== 0 && GameID.length !== 0){
    //   this.setState({ ActiveConnect: true })
    // }
  }
  // _isChangeConnect(value) {
  //   const { NamePlayer } = this.state;
  //   if ( !isNaN(value) && value.length == 13 && NamePlayer.length > 0) {
  //     this.setState({ ActiveConnect: true, GameID: value })
  //   } else {
  //     this.setState({ ActiveConnect: false, GameID: ''})
  //   }
  // }

  _isStartGame() {
    const { ActiveStart, NamePlayer } = this.state;
    const { isStartGame } = this.props;

    ActiveStart && isStartGame(NamePlayer);
  }

  // _isConnectGame() {
  //   const { ActiveConnect, GameID, NamePlayer } = this.state;
  //   const { isConnectGame } = this.props;
  //   ActiveConnect && isConnectGame(GameID, NamePlayer);
  // }

  _handleSubmitStart(event) {
    event.preventDefault();
    this._isStartGame();
  }
  // _handleSubmitConnect(event) {
  //   event.preventDefault();
  //   this._isConnectGame();
  // }

  render() {
    // const { ActiveStart, ActiveConnect } = this.state;
    const { ActiveStart } = this.state;
    return(
      <div className="menu-root">
        <div className="menu-wrapper">
          <div className="menu-elem">
            <div className="title">
              Menu Game
            </div>
          </div>
          <div className="menu-elem">
            <div className="elem">
              <form onSubmit={this._handleSubmitStart}>
                <Input type="text" placeholder="User Name" isChange={(value) => this._isChangeName(value)} />
              </form>
            </div>
          </div>
          <div className="menu-elem">
            <div  className="button-wrapper">
              <Button content="Start Game" active={ActiveStart} isClick={this._isStartGame}/>
            </div>
          </div>
          {/* <div className="menu-elem">
            <div className="elem">
              <form onSubmit={this._handleSubmitConnect}>
                <Input type="text" placeholder="Game ID" isChange={(value) => this._isChangeConnect(value)} />
              </form>
            </div>
          </div>
          <div className="menu-elem">
            <div  className="button-wrapper connect">
              <Button content="Connect to Game" active={ActiveConnect} isClick={this._isConnectGame}/>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Menu;
