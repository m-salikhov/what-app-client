import styles from './add-tournament-link.module.css';
import { reducer } from './helpers/reducer';
import { EditForm } from './Components/EditForm/EditForm';
import { Instruction } from './Components/Instruction';
import { ParsedTournament } from './Components/ParsedTournament';
import { Button } from 'Shared/Components/Button/Button';
import { Spinner } from 'Shared/Components/Spinner/Spinner';
import { useAddTournamentMutation, useParseLinkMutation } from 'Store/ToolkitAPIs/tournamentAPI';
import { addLinkInitTournament } from './helpers/addLinkInitTournament';
import { useReducer, useState } from 'react';
import { useCheckParsingErrors } from './Hooks/useCheckParsingErrors';
import { getServerErrorMessage } from 'Shared/Helpers/getServerErrorMessage';
import { useAuth } from 'Shared/Auth/useAuth';
import { setDocTitle } from 'Shared/Helpers/setDocTitle';

function AddTournamentLink() {
  setDocTitle('Добавить турнир');

  const { user } = useAuth();

  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');
  const [showParsedTournament, setShowParsedTournament] = useState(false);
  const [edit, setEdit] = useState(false);

  const [tournament, dispatch] = useReducer(reducer, addLinkInitTournament);

  const { errorsFilling, checkTournament, resetErrors } = useCheckParsingErrors();

  const [addTournament, { isLoading: isLoadingAdd, error: errorAdd }] = useAddTournamentMutation();
  const [parseTournament, { isLoading, error: errorParse }] = useParseLinkMutation();

  const handleAddTournament = async () => {
    setMessage('');
    resetErrors();

    if (!checkTournament(tournament)) return;

    await addTournament({
      ...tournament,
      questions: tournament.questions.filter((q) => q.qNumber !== -1),
      uploaderUuid: user?.id || '',
      uploader: user?.username || '',
    }).then(() => {
      setMessage('Турнир успешно сохранён в базе');
      setShowParsedTournament(false);
    });
  };

  const handleParseLink = async () => {
    try {
      setMessage('');
      resetErrors();
      setShowParsedTournament(false);

      const data = await parseTournament({ link }).unwrap();

      dispatch({ type: 'loaded', payload: data });
      setShowParsedTournament(true);
    } catch (error) {
      console.error('Failed to parse link:', error);
    }
  };

  if (edit) {
    return <EditForm tournament={tournament} dispatch={dispatch} setEdit={setEdit}></EditForm>;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className={styles.container}>
      <div className={styles.addlink}>
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

      {errorsFilling.length > 0 &&
        errorsFilling.map((error, i) => (
          <p className={styles.errorFilling} key={i}>
            {error}
          </p>
        ))}

      {message && <p className={styles.message}>{message}</p>}

      {errorParse && <p className={styles.message}>{getServerErrorMessage(errorParse, 'Ошибка парсинга ссылки')}</p>}

      {errorAdd && <p className={styles.message}>{getServerErrorMessage(errorAdd, 'Ошибка сохранения турнира')}</p>}

      {(isLoading || isLoadingAdd) && <Spinner />}

      {showParsedTournament ? (
        <ParsedTournament
          tournament={tournament}
          handleAddTournament={handleAddTournament}
          onClickEdit={() => {
            setEdit(true);
            resetErrors();
          }}
        />
      ) : (
        <Instruction />
      )}
    </div>
  );
}

export default AddTournamentLink;
