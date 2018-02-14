import React from 'react';

import ReactDOMServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import routes from '../../client/src/routes';
import reducers from '../../client/src/redux/reducers';

const store = createStore(reducers, applyMiddleware(thunk));

export default () => {
  return (req, res) => {
		const branch = matchRoutes(routes, req.url);
	  const promises = branch.map(({route}) => {
	    let fetchData = route.component.fetchData;
	    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
	  });
	  return Promise.all(promises).then((data) => {
	    if(context.status === 404) {
	          res.status(404);
	     } else if (context.status === 302) {
	      return res.redirect(302, context.url);
	    }
	    let context = {};
	    const content = ReactDOMServer.renderToString(
	      <Provider store={store}>
	         <StaticRouter location={req.url} context={context}>
	           {renderRoutes(routes)}
	         </StaticRouter>
	      </Provider>
	    );
	    const initialState = store.getState();
      res.status(200).send(renderHTML({
        content: content,
        initialState: initialState,
      }));
	  });
	}
};

function renderHTML({ content, initialState }) {
   return `
       <!DOCTYPE html>
       <html>
       <head>
         <meta charset="utf-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Tic Tac Toe</title>
         <link rel="stylesheet" href="/styles/main.css">
       </head>
       <body>
       <div id="root">${content}</div>
          <script type="text/javascript">
           window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
         </script>
         <script type="text/javascript" src="/app.js"></script>
       </body>
       </html>
   `;
}
