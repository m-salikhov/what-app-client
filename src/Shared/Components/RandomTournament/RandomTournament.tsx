import { useLazyGetRandomTournamentQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { GiPerspectiveDiceSixFacesRandom as DiceIcon } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { linkBuilder } from '../../Helpers/linkBuilder';
import { useAuth } from 'Shared/Auth/useAuth';
import { Spinner } from 'Shared/Components/Spinner/Spinner';
import { useState } from 'react';

export function RandomTournament({ pathname }: { pathname: string }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fetchRandomTournament] = useLazyGetRandomTournamentQuery();
  const [isFetching, setIsFetching] = useState(false);

  const handleClick = async () => {
    setIsFetching(true);

    try {
      const data = await fetchRandomTournament(user?.id ?? '').unwrap();
      navigate(linkBuilder(data.id, pathname));
    } catch (error) {
      setIsFetching(false);
    }
  };

  return (
    <>
      {isFetching && <Spinner width={'40px'} />}
      {!isFetching && <DiceIcon size={'40px'} onClick={handleClick} />}
    </>
  );
}
