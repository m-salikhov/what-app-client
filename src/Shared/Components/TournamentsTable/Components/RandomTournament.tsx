import { useLazyGetRandomTournamentQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { GiPerspectiveDiceSixFacesRandom as DiceIcon } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { linkBuilder } from '../Helpers/linkBuilder';
import { useGetCurrentUserQuery } from 'Store/ToolkitAPIs/userAPI';

export function RandomTournament({ pathname }: { pathname: string }) {
  const { data: currentUser } = useGetCurrentUserQuery(undefined);
  const navigate = useNavigate();
  const [fetchData] = useLazyGetRandomTournamentQuery();

  const handleClick = async () => {
    const { data } = await fetchData(currentUser?.id ?? '');
    if (data) {
      navigate(linkBuilder(data.id, data.title, pathname));
    }
  };

  return <DiceIcon size={'40px'} onClick={handleClick} />;
}
