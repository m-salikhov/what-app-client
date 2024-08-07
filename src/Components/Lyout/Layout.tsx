import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Headers/Header';
import { useInitialLogin } from '../../Hooks/useInitialLogin';

function Layout() {
  useInitialLogin();

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
