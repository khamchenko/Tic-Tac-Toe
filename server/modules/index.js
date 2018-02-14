import React from 'react';

import ReactDOMServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Template from './template';
import routes from '../../client/src/routes';
import reducers from '../../client/src/redux/reducers';

const store = createStore(reducers, applyMiddleware(thunk));

export default () => {
  return (req, res) => {
    const context = {};
		const content = ReactDOMServer.renderToString(
      <Provider store={store}>
  			<StaticRouter location={ req.url } context={ context }>
  				 {renderRoutes(routes)}
  			</StaticRouter>
       </Provider>
		);

    const initialState = store.getState();

		res.status(200).send(Template({
      content: content,
      initialState: initialState,
		}));
	}
};



// export default () => {
//   return (req, res) => {
// 		const branch = matchRoutes(routes, req.url);
// 	  const promises = branch.map(({route}) => {
// 	    let fetchData = route.component.fetchData;
// 	    return fetchData instanceof Function ? fetchData(store) : Promise.resolve(null)
// 	  });
// 	  return Promise.all(promises).then((data) => {
// 	    if(context.status === 404) {
// 	          res.status(404);
// 	     } else if (context.status === 302) {
// 	      return res.redirect(302, context.url);
// 	    }
// 	    let context = {};
// 	    const content = ReactDOMServer.renderToString(
// 	      <Provider store={store}>
// 	         <StaticRouter location={req.url} context={context}>
// 	           {renderRoutes(routes)}
// 	         </StaticRouter>
// 	      </Provider>
// 	    );
// 	    const initialState = store.getState();
//       res.status(200).send(Template({
//         content: content,
//         initialState: initialState,
//       }));
// 	  });
// 	}
// };
