import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './HOC/PrivateRoute';
import { lazy, Suspense } from 'react';
import Layout from 'src/Shared/Components/Layout/Layout';
import MainPage from 'src/Pages/Main/MainPage';
import { Spinner } from 'src/Shared/Components/Spinner/Spinner';
import { initialLoginLoader } from './Utils/InitialLoginLoader';

const Entry = lazy(() => import('src/Pages/Entry/Entry'));
const AddTournamentLink = lazy(() => import('src/Pages/AddTournamentLink/AddTournamentLink'));
const List = lazy(() => import('src/Pages/PlayMode/List'));
const PlayMode = lazy(() => import('src/Pages/PlayMode/PlayMode'));
const Profile = lazy(() => import('src/Pages/Profile/Profile'));
const NotFound = lazy(() => import('src/Pages/NotFound/NotFound'));
const AllTournaments = lazy(() => import('src/Pages/AllTournaments/AllTournaments'));
const About = lazy(() => import('src/Pages/About/About'));
const Wordle = lazy(() => import('src/Pages/Wordle/Wordle'));
const Tournament = lazy(() => import('src/Pages/Tournament/Tournament'));

const router = createBrowserRouter([
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
