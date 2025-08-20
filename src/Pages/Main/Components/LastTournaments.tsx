import styles from './main-components.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDate } from 'Shared/Helpers/getDate';
import { useGetTournamentsLastShortQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { Spinner } from 'Shared/Components/Spinner/Spinner';
import { HiArrowNarrowRight as RightArrow } from 'react-icons/hi';
import { HiArrowNarrowLeft as LeftArrow } from 'react-icons/hi';
import { RandomTournament } from 'Shared/Components/RandomTournament/RandomTournament';

export function LastTournaments() {
  const [page, setPage] = useState(1);
  const amount = 10;

  const { data, isFetching, isLoading } = useGetTournamentsLastShortQuery({
    amount,
    page,
    withSkip: true,
  });

  const handlePrevPage = () => {
    if (page === 1 || isFetching) return;
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    if (data?.hasMorePage === false || isFetching) return;
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.tournaments}>
      <div className={styles.tournamentsHeader}>
        <h2>Последние добавленные турниры</h2>
        <RandomTournament size='30' />
      </div>

      <div className={styles.tableHeader}>
        <h3>Название</h3>
        <h3>Добавлен</h3>
      </div>

      {data?.tournaments.map((v) => {
        return (
          <div className={styles.line} key={v.id}>
            <Link to={`tournament/${v.id}`}>{v.title}</Link>
            <div>
              <h5>{getDate(v.dateUpload)}</h5>
            </div>
          </div>
        );
      })}

      <div className={styles.footer}>
        <LeftArrow size={24} onClick={handlePrevPage} />
        <p>{page}</p>
        <RightArrow size={24} onClick={handleNextPage} />
      </div>
    </div>
  );
}
