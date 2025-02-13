import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Headers/Header';
import { useInitialLogin } from 'Common/Hooks/useInitialLogin';

function Layout() {
  useInitialLogin();

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
