import { Outlet } from 'react-router-dom';
import Footer from 'Shared/Components/Footer/Footer';
import Header from 'Shared/Components/Headers/Header';

function Layout() {
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
