import './notFound.css';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import NotFoundOwl from './NotFoundOwl.svg?react';
import { useRouteError } from 'react-router-dom';
import { Header } from 'Shared/Components/Headers/Header';

function NotFound() {
  useDocTitle('404');

  const error = useRouteError();
  if (error) console.error(error);

  return (
    <>
      <Header />

      <div className='not-found'>
        <h2>СТРАНИЦА НЕ НАЙДЕНА</h2>
        <NotFoundOwl />
        <p>Ошибка сервера. Попробуйте перезагрузить страницу</p>
      </div>
    </>
  );
}

export default NotFound;
