import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import './notFound.css';
import NotFoundOwl from './NotFoundOwl.svg?react';

function NotFound() {
  useDocTitle('404');

  return (
    <div className='not-found'>
      <h2>СТРАНИЦА НЕ НАЙДЕНА</h2>
      <NotFoundOwl />
    </div>
  );
}

export default NotFound;
