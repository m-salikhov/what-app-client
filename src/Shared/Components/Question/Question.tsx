import './question.css';
import { useState } from 'react';
import { Add } from './Components/Add';
import { Answer } from './Components/Answer';
import { AiOutlineDown } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { QuestionType } from 'Shared/Schemas/TournamentSchema';

interface Props {
  q: QuestionType;
  random?: boolean;
}

export function Question({ q, random = false }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className='question'>
      <div className='question-header'>
        <h3>Вопрос {q.qNumber}</h3>
        {random && <Link to={`tournament/${q.tournament?.id}`}>{q.tournament?.title}</Link>}
        {!random && <h3>Тур {q.tourNumber}</h3>}
      </div>
      {q.add && <Add add={q.add} />}
      <div className='question-text'>
        <p>{q.text}</p>
      </div>

      <div className='ans-arrow' onClick={() => setShowAnswer(!showAnswer)}>
        <h4>Ответ</h4>
        <AiOutlineDown className={showAnswer ? 'ans-arrow-o' : 'ans-arrow-c'} size={'30px'} />
      </div>
      <div className={showAnswer ? 'ans open' : 'ans close'}>
        <Answer q={q} />
      </div>
    </div>
  );
}
