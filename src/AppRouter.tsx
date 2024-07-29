import { createBrowserRouter } from 'react-router-dom';
import Main from './Components/Main/Main';
import Layout from './Components/Lyout/Layout';
import Tournament from './Components/Tournament/Tournament';
import About from './Components/About/About';
import AddTournamentLink from './Components/AddTournamentLink/AddTournamentLink';
import All from './Components/AllTournaments/All';
import Entry from './Components/Entry/Entry';
import PrivateRoute from './hoc/PrivateRoute';
import Profile from './Components/Profile/Profile';
import List from './Components/PlayMode/List';
import PlayMode from './Components/PlayMode/PlayMode';
import NotFound from './Components/NotFound/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
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
        element: <All />,
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
