import { QuestionType } from 'Shared/Schemas/TournamentSchema';
import { Add } from './Components/Add';
import { Answer } from './Components/Answer';
import './question.css';

interface Props {
  q: QuestionType;
}

export function QuestionPlane({ q }: Props) {
  return (
    <div className='question'>
      <div className='question-header'>
        <h3>Вопрос {q.qNumber}</h3>
        <h3>Тур {q.tourNumber}</h3>
      </div>
      {q.add && <Add add={q.add} />}
      <div className='question-text'>
        <p>{q.text}</p>
      </div>

      <Answer q={q} />
    </div>
  );
}
