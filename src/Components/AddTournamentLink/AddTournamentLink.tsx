import { useReducer, useState } from 'react';
import Button from '../Elements/Button/Button';
import { useDocTitle } from '../../Hooks/useDocTitle';
import { initTournament } from '../../Helpers/initValues';
import reducer from './helpers/reducer';
import EditForm from './EditForm';
import checkTournament from '../../Helpers/checkTournament';
import Instruction from './Instruction';
import {
  useAddTournamentMutation,
  useParseLinkMutation,
} from '../../Store/tournamentAPI';
import removeQuestionsID from './helpers/removeQuestionsID';
import extractServerErrorMessage from '../../Helpers/extractServerErrorMessage';
import { useInitialLoginQuery } from '../../Store/userAPI';
import { guest } from '../../constants';
import ParsedTournament from './ParsedTournament';
import { Spinner } from '../Elements/Spinner/Spinner';
import './addTournamentLink.css';

function AddTournamentLink() {
  useDocTitle('Добавить турнир');

  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');
  const [showT, setShowT] = useState(false);
  const [edit, setEdit] = useState(false);
  const [errorsFilling, setErrorsFilling] = useState<string[] | null>(null);

  const [t, dispatch] = useReducer(reducer, initTournament);

  const { data: currentUser } = useInitialLoginQuery(undefined);
  const [addT, { isLoading: isLoadingAdd, error: errorAdd }] =
    useAddTournamentMutation();
  const [parseT, { isLoading, error: errorParse }] = useParseLinkMutation();

  const handleAddTournament = async () => {
    setMessage('');
    setErrorsFilling(null);

    const errors = checkTournament(t);
    if (errors) {
      setErrorsFilling(errors);
      return;
    }
    await addT({
      ...removeQuestionsID(t),
      uploaderUuid: currentUser ? currentUser.id : guest.id,
      uploader: currentUser ? currentUser.username : guest.username,
    }).then(() => {
      setMessage('Турнир успешно сохранён в базе');
      setShowT(false);
    });
  };

  const handleParseLink = async () => {
    setMessage('');
    setErrorsFilling(null);
    setShowT(false);

    await parseT({ link })
      .unwrap()
      .then((data) => {
        dispatch({ type: 'loaded', payload: data });
        setShowT(true);
      })
      .catch(() => {});
  };

  if (edit) {
    return <EditForm t={t} dispatch={dispatch} setEdit={setEdit}></EditForm>;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <main className='addlink-container'>
      <div className='addlink'>
        <input
          type='text'
          onChange={(e) => {
            setLink(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleParseLink();
            }
          }}
        />
        <Button
          title='Открыть'
          onClick={handleParseLink}
          disabled={isLoadingAdd || isLoading}
        />
      </div>

      {errorsFilling &&
        errorsFilling.map((error, i) => (
          <p className='addlink-errors-filling' key={i}>
            {error}
          </p>
        ))}

      {message && <p className='addlink-message'>{message}</p>}

      {(errorParse || errorAdd) && (
        <p className='addlink-message'>
          {extractServerErrorMessage(errorParse || errorAdd)}
        </p>
      )}

      {(isLoading || isLoadingAdd) && <Spinner />}

      {showT ? (
        <ParsedTournament
          t={t}
          handleAddTournament={handleAddTournament}
          setEdit={setEdit}
          setErrorsFilling={setErrorsFilling}
        />
      ) : (
        <Instruction />
      )}
    </main>
  );
}

export default AddTournamentLink;
