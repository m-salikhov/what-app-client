import './profile.css';
import { ChangePass } from './Components/ChangePass';
import { getDate } from 'Shared/Helpers/getDate';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import { useGetTournamentsAllByUploaderQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { useGetUserResultShortQuery } from 'Store/ToolkitAPIs/userAPI';
import { skipToken } from '@reduxjs/toolkit/query';
import { useInitialLogin } from 'Shared/Hooks/useInitialLogin';

export default function Profile() {
  useDocTitle('Профиль');

  const { currentUser } = useInitialLogin();

  const { data: tournaments } = useGetTournamentsAllByUploaderQuery(currentUser?.id ?? skipToken);
  const { data: results = [] } = useGetUserResultShortQuery(currentUser?.id ?? skipToken);

  return (
    <div className='profile'>
      <section className='profile-wrapper'>
        <section className='user-info'>
          <div>
            <p>Имя</p>
            <p>{currentUser?.username}</p>
          </div>
          <div>
            <p>Почта</p>
            <p>{currentUser?.email}</p>
          </div>
          <div>
            <p>Зарегистрирован</p>
            <p>{currentUser ? getDate(currentUser?.date) : null}</p>
          </div>
          <div>
            <p>Статус</p>
            <p>{currentUser?.role}</p>
          </div>
        </section>
        <ChangePass />{' '}
        <section className='profile-results'>
          <h2>Ваши результаты :</h2>
          {results.length > 0 ? (
            results.map((v) => {
              return (
                <div key={v.id}>
                  <p>{`${v.title}:`}</p>
                  <p>{`${v.resultNumber} из ${v.tournamentLength}`}</p>
                </div>
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
              return <p key={v.id}>{v.title}</p>;
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
