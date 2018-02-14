import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Model from '../../components/Model';
import Menu from '../../components/Menu';
import GamePage from '../../components/GamePage';

import './Main.scss';

import { onStartGame } from '../../socket-io/StartGame';
import { onCreateModelElement } from '../../redux/actions/model';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this._isStartGame = this._isStartGame.bind(this);
    this._isCreateModelElement = this._isCreateModelElement.bind(this);
  }

  componentDidMount() {
    this._startModel();
  }

  _startModel() {
    const { isCreateModelElement } = this.props;
    var time = 800;
    setTimeout(() => {
      isCreateModelElement(1, 1);
      setTimeout(() => {
        isCreateModelElement(0, 1);
        setTimeout(() => {
          isCreateModelElement(1, 0);
          setTimeout(() => {
            isCreateModelElement(2, 1)
            setTimeout(() => {
              isCreateModelElement(1, 2)
            }, time);
          }, time);
        }, time);
      }, time);
    }, time);
  }

  _isStartGame(NamePlayer) {
    const { isStartGame } = this.props;
    isStartGame(NamePlayer);
  }

  _isCreateModelElement(i,j) {
    const { isCreateModelElement } = this.props;
    isCreateModelElement(i, j);
  }

  render() {
    const { UrlGame, Notice, ActiveNotice } = this.props;

    if (UrlGame) {
       return <Redirect to={`/game/${UrlGame}`}/>;
    }

    return (
      <div className="main-root">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <Menu isStartGame={this._isStartGame} />
            </div>
            <div className="col-md-8 col-sm-12">
              <GamePage GameFieldData={this.props.Model.data} isCreateFieldElement={this._isCreateModelElement}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ GameInfo, Model }) => {
  return {
    UrlGame: GameInfo.data ? GameInfo.data.GameID : '',
    Model: Model
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    isStartGame: (name) => {
      dispatch(onStartGame(name));
    },
    isCreateModelElement: (i, j) => {
      dispatch(onCreateModelElement(i, j));
    }
  }
};

export default connect(mapStateToProps,  mapDispatchToProps)(MainContainer);
