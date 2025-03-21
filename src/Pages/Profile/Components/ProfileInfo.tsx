import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useGetTournamentsAllByUploaderQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { useGetUserResultFullQuery } from 'Store/ToolkitAPIs/userAPI';

function ProfileInfoComponent({ userId }: { userId: string }) {
  const { data: tournaments = [] } = useGetTournamentsAllByUploaderQuery(userId);
  const { data: results = [] } = useGetUserResultFullQuery(userId);

  return (
    <>
      <section className='profile-results'>
        <h2>Ваши результаты :</h2>
        {results.length > 0 ? (
          results.map((v) => {
            return (
              <Link key={v.id} to={`/profile/${v.tournamentId}/${userId}`}>
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
        {tournaments.length > 0 ? (
          tournaments.map((v) => {
            return (
              <Link to={`/tournament/${v.id}`} key={v.id}>
                <p>{v.title}</p>
              </Link>
            );
          })
        ) : (
          <p>Вы ещё ничего не добавили</p>
        )}
      </section>
    </>
  );
}

export const ProfileInfo = memo(ProfileInfoComponent);
