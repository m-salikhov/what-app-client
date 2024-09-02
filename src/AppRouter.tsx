import { createHashRouter } from 'react-router-dom';
import MainPage from './Components/Main/MainPage';
import Layout from './Components/Layout/Layout';
import Tournament from './Components/Tournament/Tournament';
import About from './Components/About/About';
import AddTournamentLink from './Components/AddTournamentLink/AddTournamentLink';
import AllTournaments from './Components/AllTournaments/AllTournaments';
import Entry from './Components/Entry/Entry';
import PrivateRoute from './hoc/PrivateRoute';
import Profile from './Components/Profile/Profile';
import List from './Components/PlayMode/List';
import PlayMode from './Components/PlayMode/PlayMode';
import NotFound from './Components/NotFound/NotFound';

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'tournament/:id',
        element: <Tournament />,
      },
      {
        path: 'addbylink',
        element: <AddTournamentLink />,
      },
      {
        path: 'all',
        element: <AllTournaments />,
      },
      {
        path: 'entry',
        element: <Entry />,
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'playmode',
        children: [
          {
            index: true,
            element: <List />,
          },
          {
            path: ':id/:title',
            element: <PlayMode />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
