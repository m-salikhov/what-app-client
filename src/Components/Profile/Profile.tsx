import { useState } from 'react';
import { getDate } from '../../Helpers/getDate';
import ChangePass from './ChangePass';
import { useDocTitle } from '../../Hooks/useDocTitle';
import './profile.scss';
import { useGetUserLogfirstQuery, useGetUserResultShortQuery } from '../../Store/userAPI';
import { createPortal } from 'react-dom';
import { useGetTournamentsAllByUploaderQuery } from '../../Store/tournamentAPI';

const Profile = () => {
  useDocTitle('Профиль');

  const [changePass, setChangePass] = useState(false);
  const { data: currentUser } = useGetUserLogfirstQuery(undefined);
  const { data: tournaments } = useGetTournamentsAllByUploaderQuery(currentUser?.id || '');
  const { data: results } = useGetUserResultShortQuery(currentUser?.id || '');

  return (
    <main className='pr'>
      <div className='pr-wrapper'>
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

        {changePass &&
          currentUser &&
          createPortal(<ChangePass setChangePass={setChangePass} id={currentUser.id} />, document.body)}

        <button type='button' onClick={() => setChangePass(true)}>
          Изменить пароль
        </button>

        {/* <Button title="Изменить пароль" onClick={() => setChangePass(true)} /> */}

        <section className='pr-res'>
          <p>Ваши результаты :</p>
          {results ? (
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
        <section className='pr-ts'>
          <p>Добавленные вами турниры:</p>
          {tournaments ? (
            tournaments.map((v) => {
              return <p key={v.id}>{v.title}</p>;
            })
          ) : (
            <p>Вы пока что ничего не добавили</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Profile;
