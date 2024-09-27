import { createHashRouter } from 'react-router-dom';
import MainPage from './Components/Main/MainPage';
import Layout from './Components/Layout/Layout';
import PrivateRoute from './hoc/PrivateRoute';
import { lazy, Suspense } from 'react';
import { Spinner } from './Components/Elements/Spinner/Spinner';

const Entry = lazy(() => import('./Components/Entry/Entry'));
const AddTournamentLink = lazy(() => import('./Components/AddTournamentLink/AddTournamentLink'));
const List = lazy(() => import('./Components/PlayMode/List'));
const PlayMode = lazy(() => import('./Components/PlayMode/PlayMode'));
const Profile = lazy(() => import('./Components/Profile/Profile'));
const NotFound = lazy(() => import('./Components/NotFound/NotFound'));
const AllTournaments = lazy(() => import('./Components/AllTournaments/AllTournaments'));
const About = lazy(() => import('./Components/About/About'));
const Wordle = lazy(() => import('./Components/Wordle/Wordle'));
const Tournament = lazy(() => import('./Components/Tournament/Tournament'));

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
        element: (
          <Suspense fallback={<Spinner />}>
            {' '}
            <About />{' '}
          </Suspense>
        ),
      },
      {
        path: 'tournament/:id',
        element: (
          <Suspense fallback={<Spinner />}>
            {' '}
            <Tournament />{' '}
          </Suspense>
        ),
      },
      {
        path: 'addbylink',
        element: (
          <Suspense fallback={<Spinner />}>
            <AddTournamentLink />
          </Suspense>
        ),
      },
      {
        path: 'all',
        element: (
          <Suspense fallback={<Spinner />}>
            {' '}
            <AllTournaments />
          </Suspense>
        ),
      },
      {
        path: 'entry',
        element: (
          <Suspense fallback={<Spinner />}>
            <Entry />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Suspense fallback={<Spinner />}>
              <Profile />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: 'wordle',
        element: (
          <Suspense fallback={<Spinner />}>
            <Wordle />
          </Suspense>
        ),
      },
      {
        path: 'playmode',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Spinner />}>
                <List />{' '}
              </Suspense>
            ),
          },
          {
            path: ':id/:title',
            element: (
              <Suspense fallback={<Spinner />}>
                <PlayMode />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Spinner />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
