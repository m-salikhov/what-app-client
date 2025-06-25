import { useInitialLogin } from 'Shared/Hooks/useInitialLogin';
import { useLazyGetRandomTournamentQuery } from 'Store/ToolkitAPIs/tournamentAPI';
import { GiPerspectiveDiceSixFacesRandom as DiceIcon } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { linkBuilder } from '../Helpers/linkBuilder';

interface Props {
  pathname: string;
}
export function RandomTournament({ pathname }: Props) {
  const { currentUser } = useInitialLogin();
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
