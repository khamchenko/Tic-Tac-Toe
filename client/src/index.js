import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap-grid/dist/grid.min.css';

import createStore from './redux/store/createStore';
import { IS_DEV } from '../utils/env';

import App from './App';
import routes from './routes';

const rootReact = document.getElementById('root');
const store = createStore();

import ConnectClientWS from './socket-io/ConnectClient';

const { dispatch } = store;

dispatch(ConnectClientWS());

const renderApp = (Component, appRoutes) => {
  render(
    <Provider store={store}>
      <Component routes={appRoutes}/>
    </Provider>, rootReact
  );
};

renderApp(App, routes);

console.log();

if ( IS_DEV && module.hot) {
  module.hot.accept('./App', () => {
    import('./App').then(({ default: NextApp }) => {
      renderApp(NextApp, routes);
    });

  });

  module.hot.accept('./routes', () => {
    import('./routes').then(({ default: nextRoutes }) => {
      renderApp(App, nextRoutes);
    });

  });
}
