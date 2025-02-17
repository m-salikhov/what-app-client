import { createHashRouter } from 'react-router-dom';
import PrivateRoute from './HOC/PrivateRoute';
import { lazy, Suspense } from 'react';
import Layout from 'src/modules/Layout/Layout';
import MainPage from 'src/modules/Main/MainPage';
import { Spinner } from 'Common/Components/Spinner/Spinner';
import { initialLoginLoader } from './Utils/InitialLoginLoader';

const Entry = lazy(() => import('src/modules/Entry/Entry'));
const AddTournamentLink = lazy(() => import('src/modules/AddTournamentLink/AddTournamentLink'));
const List = lazy(() => import('src/modules/PlayMode/List'));
const PlayMode = lazy(() => import('src/modules/PlayMode/PlayMode'));
const Profile = lazy(() => import('src/modules/Profile/Profile'));
const NotFound = lazy(() => import('src/modules/NotFound/NotFound'));
const AllTournaments = lazy(() => import('src/modules/AllTournaments/AllTournaments'));
const About = lazy(() => import('src/modules/About/About'));
const Wordle = lazy(() => import('src/modules/Wordle/Wordle'));
const Tournament = lazy(() => import('src/modules/Tournament/Tournament'));

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    loader: initialLoginLoader,
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
