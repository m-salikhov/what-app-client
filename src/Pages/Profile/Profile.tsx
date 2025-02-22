import './profile.css';
import { ChangePass } from './Components/ChangePass/ChangePass';
import { getDate } from 'Shared/Helpers/getDate';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import { useGetTournamentsAllByUploaderQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { useGetUserResultFullQuery } from 'Store/ToolkitAPIs/userAPI';
import { skipToken } from '@reduxjs/toolkit/query';
import { useInitialLogin } from 'Shared/Hooks/useInitialLogin';
import { Link } from 'react-router-dom';

export default function Profile() {
  useDocTitle('Профиль');

  const { currentUser } = useInitialLogin();

  const { data: tournaments } = useGetTournamentsAllByUploaderQuery(currentUser?.id ?? skipToken);
  const { data: results = [] } = useGetUserResultFullQuery(currentUser?.id ?? skipToken);

  if (!currentUser) return null;

  return (
    <div className='profile'>
      <section className='profile-wrapper'>
        <section className='user-info'>
          <div>
            <p>Имя</p>
            <p>{currentUser.username}</p>
          </div>
          <div>
            <p>Почта</p>
            <p>{currentUser.email}</p>
          </div>
          <div>
            <p>Зарегистрирован</p>
            <p>{getDate(currentUser.date)}</p>
          </div>
          <div>
            <p>Статус</p>
            <p>{currentUser.role}</p>
          </div>
        </section>
        <ChangePass />{' '}
        <section className='profile-results'>
          <h2>Ваши результаты :</h2>
          {results.length > 0 ? (
            results.map((v) => {
              return (
                <Link key={v.id} to={`/profile/${v.tournamentId}/${currentUser.id}`}>
                  <p>{`${v.title}:`}</p>
                  <p>{`${v.resultNumber} из ${v.tournamentLength}`}</p>
                </Link>
              );
            })
          ) : (
            <p>Нет сыгранных турниров</p>
          )}
        </section>
        <section className='profile-adds'>
          <h2>Добавленные вами турниры:</h2>
          {tournaments ? (
            tournaments.map((v) => {
              return (
                <Link to={`/tournament/${v.id}`} key={v.id}>
                  <p>{v.title}</p>
                </Link>
              );
            })
          ) : (
            <div>
              <p>Вы пока что ничего не добавили</p>
            </div>
          )}
        </section>
      </section>
    </div>
  );
}
