import ReactDOM from 'react-dom/client';
import { scan } from 'react-scan';
import { Provider } from 'react-redux';
import { store } from 'Store/store';
import { RouterProvider } from 'react-router-dom';
import router from 'src/Router/AppRouter';
import 'Shared/Styles/style.css';

scan({
  enabled: true,
});

const root = ReactDOM.createRoot(document.querySelector('#root')!);
root.render(
  <Provider store={store}>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  </Provider>
);
