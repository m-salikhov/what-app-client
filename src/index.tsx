import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from 'Store/store';
import { RouterProvider } from 'react-router-dom';
import router from 'src/Router/AppRouter';
import 'Common/Styles/style.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={setupStore()}>
    <RouterProvider router={router} />
  </Provider>
);
