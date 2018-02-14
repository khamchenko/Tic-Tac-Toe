import RootRoutes from '../containers/RootContainers';
import MainRoutes from '../containers/MainContainers';
import GameRoutes from '../containers/GameContainers';

const routes = [
  { component: RootRoutes,
    routes: [
      {
        path: '/',
        exact: true,
        component: MainRoutes
      },
      {
        path: '/game',
        component: GameRoutes
      }
    ]
  }
];

export default routes;
