import ExternalLinkText from 'Common/Components/Text/ExternalLinkText/ExternalLinkText';
import { QuestionType } from 'Common/Types/question';

function Answer({ q }: { q: QuestionType }) {
  return (
    <div className='answer'>
      <p>
        <span>Ответ:</span> {q.answer}
      </p>
      {q.alterAnswer && (
        <p>
          <span>Зачёт:</span> {q.alterAnswer}
        </p>
      )}
      {q.comment && (
        <p>
          <span>Комментарий:</span> {q.comment}
        </p>
      )}
      {q.source?.length === 1 && (
        <p className='answer-source-one'>
          <span>Источник: </span>{' '}
          {q.source[0].startsWith('http') ? <ExternalLinkText text={q.source[0]} href={q.source[0]} /> : q.source[0]}
        </p>
      )}
      {q.source && q.source.length > 1 && (
        <div>
          <p className='answer-source-many'>Источники:</p>
          {q.source.map((v, i) => {
            return (
              <p key={i}>
                {++i}. {v.startsWith('http') ? <ExternalLinkText text={v} href={v} /> : v}
              </p>
            );
          })}
        </div>
      )}
      <p>
        <span>Автор:</span> {q.author}
      </p>
    </div>
  );
}

export default Answer;
