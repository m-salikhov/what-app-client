import NotFoundOwl from './NotFoundOwl.svg?react';
import { useRouteError } from 'react-router-dom';
import { Header } from 'Shared/Components/Headers/Header';
import styles from './notFound.module.css';
import { setDocTitle } from 'Shared/Helpers/setDocTitle';

function NotFound({ routerError }: { routerError: boolean }) {
  setDocTitle('404');

  const error = useRouteError();
  if (error) console.error(error);

  return (
    <>
      {routerError && <Header />}

      <div className={styles.container}>
        <h2>СТРАНИЦА НЕ НАЙДЕНА</h2>
        <NotFoundOwl />
        <p>Ошибка сервера. Попробуйте перезагрузить страницу</p>
      </div>
    </>
  );
}

export default NotFound;
