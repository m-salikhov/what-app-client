import { createHashRouter } from 'react-router-dom';
import MainPage from '../modules/Main/MainPage';
import Layout from '../modules/Layout/Layout';
import PrivateRoute from './hoc/PrivateRoute';
import { lazy, Suspense } from 'react';
import { Spinner } from '../modules/Elements/Spinner/Spinner';

const Entry = lazy(() => import('../modules/Entry/Entry'));
const AddTournamentLink = lazy(() => import('../modules/AddTournamentLink/AddTournamentLink'));
const List = lazy(() => import('../modules/PlayMode/List'));
const PlayMode = lazy(() => import('../modules/PlayMode/PlayMode'));
const Profile = lazy(() => import('../modules/Profile/Profile'));
const NotFound = lazy(() => import('../modules/NotFound/NotFound'));
const AllTournaments = lazy(() => import('../modules/AllTournaments/AllTournaments'));
const About = lazy(() => import('../modules/About/About'));
const Wordle = lazy(() => import('../modules/Wordle/Wordle'));
const Tournament = lazy(() => import('../modules/Tournament/Tournament'));

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
