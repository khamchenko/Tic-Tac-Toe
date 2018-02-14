import React, { Component } from 'react';

import ElementX from './Elements/element-x';
import Element0 from './Elements/element-0';
import './GamePage.scss';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this._onClickElement = this._onClickElement.bind(this)
  }

  _onClickElement(i, j){
    const { isCreateFieldElement } = this.props;
    isCreateFieldElement(i,j);
  }

  render () {
    const { GameFieldData} = this.props;
    return(
      <div>
        {
          GameFieldData.map((elem, i) => {
            return (
              <div key={i}>
                <div className="row-table">
                  {
                    elem.map((item, j) => {
                      return(
                        <div key={j} className="cell" >
                          <div className="cell-elem" onClick={() => this._onClickElement(i, j)}>
                            {
                              item.value === 1 ?
                                <ElementX />
                                : (item.value === 0 ) ?
                                <Element0 />
                                : null
                            }
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default GamePage;
