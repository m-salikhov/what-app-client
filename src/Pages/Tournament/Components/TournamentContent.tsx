import { animated, useTransition } from '@react-spring/web';
import { useRef } from 'react';
import { getToursParagraphs, scroll } from './scrollLogic';
import { Back } from 'Shared/Components/Back/Back';
import { Question } from 'Shared/Components/Question/Question';
import { TournamentHeader } from 'Shared/Components/TournamentHeader/TournamentHeader';
import { TournamentType } from 'Shared/Schemas/TournamentSchema';

export function TournamentContent({ tournament }: { tournament: TournamentType }) {
  const ref = useRef(null);

  const transitions = useTransition(tournament.questions, {
    from: { opacity: 0, transform: 'scale(0.8) translateY(5rem)' },
    enter: { opacity: 1, transform: 'scale(1) translateY(0)' },
    config: { duration: 400 },
  });

  return (
    <>
      <TournamentHeader tournament={tournament} />

      <div className='tournament-content' ref={ref}>
        <div className='tournament-content-header'>
          <Back />
          <div className='tournament-content-tours' onClick={(e) => scroll(e, ref.current, tournament)}>
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
