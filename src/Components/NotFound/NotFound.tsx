import './notFound.css';
import { useDocTitle } from '../../Hooks/useDocTitle';
import NotFoundOwl from './NotFoundOwl.svg?react';

function NotFound() {
  useDocTitle('404');

  return (
    <main className='not-found'>
      <h2>СТРАНИЦА НЕ НАЙДЕНА</h2>
      <NotFoundOwl />
    </main>
  );
}

export default NotFound;
