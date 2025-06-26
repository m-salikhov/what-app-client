import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDate } from 'Shared/Helpers/getDate';
import { useGetTournamentsLastShortQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { Spinner } from 'Shared/Components/Spinner/Spinner';
import { extractServerErrorMessage } from 'Shared/Helpers/extractServerErrorMessage';
import { HiArrowNarrowRight as RightArrow } from 'react-icons/hi';
import { HiArrowNarrowLeft as LeftArrow } from 'react-icons/hi';

export function LastTournaments() {
  const [page, setPage] = useState(1);
  const amount = 10;

  const { data, isFetching, isLoading, error } = useGetTournamentsLastShortQuery({
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
      <div className='main-content-tournaments-loading'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <h2>{extractServerErrorMessage(error)}</h2>;
  }

  return (
    <div className='main-content-tournaments'>
      <h2>Последние добавленные турниры</h2>

      <div className='tournaments-header'>
        <h3>Название</h3>
        <h3>Добавлен</h3>
      </div>

      {data?.tournaments.map((v) => {
        return (
          <div className='tournaments-item' key={v.id}>
            <Link to={`tournament/${v.id}`}>{v.title}</Link>
            <div>
              <h5>{getDate(v.dateUpload)}</h5>
            </div>
          </div>
        );
      })}

      <div className='tournaments-footer'>
        <LeftArrow size={25} onClick={handlePrevPage} />
        <p>{page}</p>
        <RightArrow size={25} onClick={handleNextPage} />
      </div>
    </div>
  );
}
