import { QuestionType } from 'Shared/Schemas/TournamentSchema';
import { ExternalLinkText } from 'src/Shared/Components/Text/ExternalLinkText/ExternalLinkText';

export function Answer({ q }: { q: QuestionType }) {
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
          {q.source[0].link.startsWith('http') ? (
            <ExternalLinkText text={q.source[0].link} href={q.source[0].link} />
          ) : (
            q.source[0].link
          )}
        </p>
      )}
      {q.source && q.source.length > 1 && (
        <div>
          <p className='answer-source-many'>Источники:</p>
          {q.source?.map((v, i) => {
            return (
              <p key={v.link}>
                {++i}. {v.link.startsWith('http') ? <ExternalLinkText text={v.link} href={v.link} /> : v.link}
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
