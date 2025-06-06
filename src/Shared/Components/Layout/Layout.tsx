import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from 'Shared/Components/Footer/Footer';
import { Header } from 'Shared/Components/Headers/Header';

export function Layout() {
  const { pathname } = useLocation();

  const hideFooter = /playmode/.test(pathname);

  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      {!hideFooter && <Footer />}
    </>
  );
}
