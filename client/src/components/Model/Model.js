import React, { Component } from 'react';

import ElementX from '../GamePage/Elements/element-x';
import Element0 from '../GamePage/Elements/element-0';

import './Model.scss';

class Model extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { ModelData } = this.props;
    return(
      <div>
        {
          ModelData.map((elem, i) => {
            return (
              <div key={i}>
                <div className="row-table">
                  {
                    elem.map((item, j) => {
                      return(
                        <div key={j}className="cell">
                          <div className="cell-elem">
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
    )
  }
}

export default Model;
