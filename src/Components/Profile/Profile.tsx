import './profile.css';
import { useState } from 'react';
import { getDate } from '../../Helpers/getDate';
import ChangePass from './ChangePass';
import { useDocTitle } from '../../Hooks/useDocTitle';
import { useInitialLoginQuery, useGetUserResultShortQuery } from '../../Store/ToolkitAPIs/userAPI';
import { useGetTournamentsAllByUploaderQuery } from '../../Store/ToolkitAPIs/tournamentAPI';
import { useTransition, animated } from '@react-spring/web';

function Profile() {
  useDocTitle('Профиль');

  const [changePass, setChangePass] = useState(false);
  const { data: currentUser } = useInitialLoginQuery(undefined);
  const { data: tournaments } = useGetTournamentsAllByUploaderQuery(currentUser?.id || '');
  const { data: results = [] } = useGetUserResultShortQuery(currentUser?.id || '');

  const transition = useTransition(changePass, {
    from: {
      scale: 0.5,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
    leave: {
      scale: 0.5,
      opacity: 0,
    },

    config: { duration: 300 },
  });

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

        <div className='change-pass-text'>
          <p onClick={() => setChangePass(true)}>изменить пароль</p>
        </div>

        {transition((style, changePass) => {
          return changePass ? (
            <animated.div style={style} className='change-pass-wrapper'>
              <ChangePass setChangePass={setChangePass} id={currentUser?.id || ''} />{' '}
            </animated.div>
          ) : null;
        })}

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
            <div>
              <p>Нет сыгранных турниров</p>
            </div>
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
