import React from 'react';
import { renderRoutes } from 'react-router-config';

import './RootLayout.scss'
import HeaderContainers from '../HeaderContainers';

export default ({ route: { routes } }) => (
  <div>
    <HeaderContainers />
    <div id="content">{renderRoutes(routes)}</div>
  </div>
);
