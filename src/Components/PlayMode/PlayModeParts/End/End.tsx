import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../Hooks/redux';
import Button from '../../../Elements/Button/Button';
import QuestionPlane from '../../../Elements/Question/QuestionPlane';
import ResBlock from './ResBlock';
import TourTable from './TourTable';
import {
  useInitialLoginQuery,
  usePostUserResultMutation,
} from '../../../../Store/userAPI';
import extractServerErrorMessage from '../../../../Helpers/extractServerErrorMessage';
import { StepProps } from '../Types/playmodeTypes';
import { ResultType } from '../../../../Store/reducers/PlayModeSlice';

const renderResTables = (
  endedTourNumber: number,
  result: ResultType,
  setSelectedQ: Dispatch<SetStateAction<number>>
) => {
  const resTables = [];
  for (let i = 1; i <= endedTourNumber; i++) {
    resTables.push(
      <TourTable
        res={result[i]}
        setSelectedQ={setSelectedQ}
        key={result[i][0].num}
      />
    );
  }
  return resTables;
};

function End({ tournament }: StepProps) {
  const navigate = useNavigate();
  const { data: currentUser } = useInitialLoginQuery(undefined);
  const [saveUserResult, { isSuccess, error }] = usePostUserResultMutation();

  const [selectedQ, setSelectedQ] = useState(0);
  const {
    currentQuestionIndex,
    result,
    totalAnsweredCount,
    totalQuestionsCount,
  } = useAppSelector((state) => state.playModeReducer);
  const endedTourNumber = tournament.questions[currentQuestionIndex].tourNumber;

  useEffect(() => {
    if (currentUser?.id) {
      const userResult = {
        userId: currentUser.id,
        title: tournament.title,
        tournamentId: tournament.id,
        tournamentLength: totalQuestionsCount,
        resultNumber: totalAnsweredCount,
        result,
      };
      saveUserResult(userResult)
        .unwrap()
        .then((data) => console.log(data));
    }
  }, [
    tournament.questionsQuantity,
    tournament.id,
    tournament.title,
    currentUser,
    result,
    totalAnsweredCount,
    saveUserResult,
  ]);

  return (
    <div className='endt'>
      <ResBlock tournament={tournament} />

      {renderResTables(endedTourNumber, result, setSelectedQ)}

      {isSuccess && <p>Ваш результат доступен в Профиле</p>}

      {error && (
        <p>
          {extractServerErrorMessage(error) ||
            'Ошибка при сохранении результата'}
        </p>
      )}

      <Button title='К выбору турнира' onClick={() => navigate('/playmode')} />

      {Boolean(selectedQ) && (
        <QuestionPlane q={tournament.questions[selectedQ - 1]} />
      )}
    </div>
  );
}

export default End;
