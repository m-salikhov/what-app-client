import './profile.css';
import { getDate } from '../../Helpers/getDate';
import { ChangePass } from './ChangePass';
import { useDocTitle } from '../../Hooks/useDocTitle';
import { useInitialLoginQuery, useGetUserResultShortQuery } from '../../Store/ToolkitAPIs/userAPI';
import { useGetTournamentsAllByUploaderQuery } from '../../Store/ToolkitAPIs/tournamentAPI';

function Profile() {
  useDocTitle('Профиль');

  const { data: currentUser } = useInitialLoginQuery(undefined);
  const { data: tournaments } = useGetTournamentsAllByUploaderQuery(currentUser?.id || '');
  const { data: results = [] } = useGetUserResultShortQuery(currentUser?.id || '');

  return (
    <main className='profile'>
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
    </main>
  );
}

export default Profile;
