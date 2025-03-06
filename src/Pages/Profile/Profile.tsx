import './profile.css';
import { ChangePass } from './Components/ChangePass/ChangePass';
import { getDate } from 'Shared/Helpers/getDate';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import { useInitialLogin } from 'Shared/Hooks/useInitialLogin';
import { ProfileInfo } from './Components/ProfileInfo';

export default function Profile() {
  useDocTitle('Профиль');

  const { currentUser } = useInitialLogin();

  if (!currentUser) return null;

  return (
    <div className='profile'>
      <div className='profile-wrapper'>
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
        <ChangePass />
        <ProfileInfo userId={currentUser.id} />
      </div>
    </div>
  );
}
