import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './Store/store';
import './CommonStyle/style.scss';
import { RouterProvider } from 'react-router-dom';
import router from './AppRouter';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
