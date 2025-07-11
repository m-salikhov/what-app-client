import styles from './profile.module.css';
import { ChangePass } from './Components/ChangePass/ChangePass';
import { getDate } from 'Shared/Helpers/getDate';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import { ProfileContent } from './Components/ProfileContent';
import { useAuth } from 'Shared/Auth/useAuth';

export default function Profile() {
  useDocTitle('Профиль');

  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <section className={styles.userInfo}>
          <div>
            <p>Имя</p>
            <p>{user.username}</p>
          </div>
          <div>
            <p>Почта</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p>Зарегистрирован</p>
            <p>{getDate(user.date)}</p>
          </div>
          <div>
            <p>Статус</p>
            <p>{user.role}</p>
          </div>
        </section>
        <ChangePass />
        <ProfileContent userId={user.id} />
      </div>
    </div>
  );
}
