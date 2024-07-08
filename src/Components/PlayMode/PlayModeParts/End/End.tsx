import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../Hooks/redux';
import Button from '../../../Elements/Button/Button';
import QuestionPlane from '../../../Elements/Question/QuestionPlane';
import ResBlock from './ResBlock';
import TourTable from './TourTable';
import { useGetUserLogfirstQuery, usePostUserResultMutation } from '../../../../Store/userAPI';
import extractServerErrorMessage from '../../../../Helpers/extractServerErrorMessage';

function End() {
  const navigate = useNavigate();
  const { data: currentUser } = useGetUserLogfirstQuery(undefined);
  const [saveUserResult, { isSuccess, error }] = usePostUserResultMutation();

  const [selectedQ, setSelectedQ] = useState(0);
  const { t, qCounter, result, answeredCount } = useAppSelector((state) => state.playModeReducer);
  const endedTourNumber = t.questions[qCounter].tourNumber;

  const renderResTables = (endedTourNumber: number) => {
    let resTables = [];
    for (let i = 1; i <= endedTourNumber; i++) {
      resTables.push(<TourTable res={result[i]} setSelectedQ={setSelectedQ} key={result[i][0].num} />);
    }
    return resTables;
  };

  useEffect(() => {
    if (currentUser) {
      const userResult = {
        userId: currentUser.id,
        title: t.title,
        tournamentId: t.id,
        tournamentLength: t.questionsQuantity,
        resultNumber: answeredCount,
        result,
      };
      saveUserResult(userResult)
        .unwrap()
        .then((data) => console.log(data));
    }
  }, [t.questionsQuantity, t.id, t.title, currentUser, result, answeredCount, saveUserResult]);

  return (
    <div className='endt'>
      <ResBlock />
      {renderResTables(endedTourNumber)}
      {isSuccess && <p>Ваш результат доступен в Профиле</p>}
      {error && <p>{extractServerErrorMessage(error) || 'Ошибка при сохранении результата'}</p>}
      <Button title='К выбору турнира' onClick={() => navigate('/playmode')} />
      {Boolean(selectedQ) && <QuestionPlane q={t.questions[selectedQ - 1]} />}
    </div>
  );
}

export default End;
