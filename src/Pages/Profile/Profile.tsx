import styles from './profile.module.css';
import { ChangePass } from './Components/ChangePass/ChangePass';
import { getDate } from 'Shared/Helpers/getDate';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import { ProfileContent } from './Components/ProfileContent';
import { useGetCurrentUserQuery } from 'Store/ToolkitAPIs/userAPI';

export default function Profile() {
  useDocTitle('Профиль');

  const { data: currentUser } = useGetCurrentUserQuery(undefined);

  if (!currentUser) return null;

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <section className={styles.userInfo}>
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
        <ProfileContent userId={currentUser.id} />
      </div>
    </div>
  );
}
