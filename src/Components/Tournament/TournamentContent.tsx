import { getDate } from '../../Helpers/getDate';
import { TournamentType } from '../../Types/tournament';
import { animated, useTransition } from '@react-spring/web';
import { useRef } from 'react';
import Question from '../Elements/Question/Question';
import { getToursParagraphs, scroll } from './scrollLogic';
import Back from '../Elements/Back/Back';

function TournamentContent({ tournament }: { tournament: TournamentType }) {
  const ref = useRef(null);

  const transitions = useTransition(tournament.questions, {
    from: { opacity: 0, transform: 'scale(0.8) translateY(5rem)' },
    enter: { opacity: 1, transform: 'scale(1) translateY(0)' },
    config: { duration: 400 },
  });

  return (
    <>
      <div className='tournament-header'>
        <div className='tournament-header-t'>
          <h2>{tournament.title}</h2>
          <p>
            <span>добавил </span>
            {tournament.uploader}
          </p>
        </div>

        <div className='tournament-header-m'>
          <h3>
            Дата отыгрыша: <span>{getDate(tournament.date)}</span>
          </h3>
          <h3>
            Туры: <span>{tournament.tours}</span>
          </h3>
          <h3>
            Вопросы: <span>{tournament.questionsQuantity}</span>
          </h3>
        </div>
        <h3>
          Редакция: <span>{tournament.editors.join(', ')}</span>
        </h3>
      </div>

      <div className='tournament-content' ref={ref}>
        <div className='tournament-content-header'>
          {' '}
          <div className='back'>
            <Back />
          </div>
          <div
            className='tournament-content-tours'
            onClick={(e) => scroll(e, ref.current, tournament)}
          >
            {getToursParagraphs(tournament.tours)}
          </div>
        </div>

        <div className='tournament-content-qs'>
          {transitions((style, v) => {
            return (
              <animated.div style={style}>
                <Question q={v} />
              </animated.div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default TournamentContent;
