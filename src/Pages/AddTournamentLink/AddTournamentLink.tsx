import './addTournamentLink.css';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import reducer from './helpers/reducer';
import EditForm from './Components/EditForm/EditForm';
import Instruction from './Components/Instruction';
import ParsedTournament from './Components/ParsedTournament';
import Button from 'Shared/Components/Button/Button';
import { Spinner } from 'Shared/Components/Spinner/Spinner';
import { guest } from 'Shared/Constants/constants';
import { checkTournament } from './helpers/checkTournament';
import extractServerErrorMessage from 'Shared/Helpers/extractServerErrorMessage';
import { useAddTournamentMutation, useParseLinkMutation } from 'Store/ToolkitAPIs/tournamentAPI';
import { addLinkInitTournament } from './helpers/addLinkInitTournament';
import { useReducer, useState } from 'react';
import { useInitialLogin } from 'Shared/Hooks/useInitialLogin';

function AddTournamentLink() {
  useDocTitle('Добавить турнир');

  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');
  const [showParsedTournament, setShowParsedTournament] = useState(false);
  const [edit, setEdit] = useState(false);
  const [errorsFilling, setErrorsFilling] = useState<string[] | null>(null);

  const [t, dispatch] = useReducer(reducer, addLinkInitTournament);

  const { currentUser } = useInitialLogin();

  const [addT, { isLoading: isLoadingAdd, error: errorAdd }] = useAddTournamentMutation();
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
      ...t,
      uploaderUuid: currentUser ? currentUser.id : guest.id,
      uploader: currentUser ? currentUser.username : guest.username,
    }).then(() => {
      setMessage('Турнир успешно сохранён в базе');
      setShowParsedTournament(false);
    });
  };

  const handleParseLink = async () => {
    setMessage('');
    setErrorsFilling(null);
    setShowParsedTournament(false);

    await parseT({ link })
      .unwrap()
      .then((data) => {
        dispatch({ type: 'loaded', payload: data });
        setShowParsedTournament(true);
      })
      .catch(() => {});
  };

  if (edit) {
    return <EditForm t={t} dispatch={dispatch} setEdit={setEdit}></EditForm>;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className='addlink-container'>
      <div className='addlink'>
        <input
          type='text'
          placeholder='Ссылка на турнир'
          onChange={(e) => {
            setLink(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleParseLink();
            }
          }}
        />
        <Button title='Открыть' onClick={handleParseLink} disabled={isLoadingAdd || isLoading} />
      </div>

      {errorsFilling &&
        errorsFilling.map((error, i) => (
          <p className='addlink-errors-filling' key={i}>
            {error}
          </p>
        ))}

      {message && <p className='addlink-message'>{message}</p>}

      {(errorParse || errorAdd) && (
        <p className='addlink-message'>{extractServerErrorMessage(errorParse || errorAdd)}</p>
      )}

      {(isLoading || isLoadingAdd) && <Spinner />}

      {showParsedTournament ? (
        <ParsedTournament
          t={t}
          handleAddTournament={handleAddTournament}
          setEdit={setEdit}
          setErrorsFilling={setErrorsFilling}
        />
      ) : (
        <Instruction />
      )}
    </div>
  );
}

export default AddTournamentLink;
