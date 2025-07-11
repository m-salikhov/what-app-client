import { useLazyGetRandomTournamentQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { GiPerspectiveDiceSixFacesRandom as DiceIcon } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { linkBuilder } from '../Helpers/linkBuilder';
import { useAuth } from 'Shared/Auth/useAuth';

export function RandomTournament({ pathname }: { pathname: string }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fetchData] = useLazyGetRandomTournamentQuery();

  const handleClick = async () => {
    const { data } = await fetchData(user?.id ?? '');
    if (data) {
      navigate(linkBuilder(data.id, data.title, pathname));
    }
  };

  return <DiceIcon size={'40px'} onClick={handleClick} />;
}
