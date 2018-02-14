import React from 'react';
import './ElementX.scss';
import ImgX from '../../../icon/X.svg';

const ElementX = () => (
  <div className="ElementX-root">
    <div className="ElementX-wrapper">
      <img className="icon" src={ImgX} alt='X' />
    </div>
  </div>
);

export default ElementX;
