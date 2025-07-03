import './tournament.css';
import { useLoaderData } from 'react-router-dom';
import { useDocTitle } from 'Shared/Hooks/useDocTitle';
import { TournamentType } from 'Shared/Schemas/TournamentSchema';
import { animated, useTransition } from '@react-spring/web';
import { useRef } from 'react';
import { TournamentHeader } from 'Shared/Components/TournamentHeader/TournamentHeader';
import { Back } from 'Shared/Components/Back/Back';
import { Question } from 'Shared/Components/Question/Question';
import { ScrollToTop } from 'Shared/Components/ScrollToTop/ScrollToTop';
import { getToursParagraphs, scroll } from './Helpers/scrollLogic';

export default function Tournament() {
  const tournament = useLoaderData() as TournamentType;

  useDocTitle(tournament.title);

  window.scrollTo({ top: 0, behavior: 'smooth' });

  const ref = useRef(null);

  const transitions = useTransition(tournament.questions, {
    from: { opacity: 0, transform: 'scale(0.8) translateY(5rem)' },
    enter: { opacity: 1, transform: 'scale(1) translateY(0)' },
    config: { duration: 400 },
  });

  return (
    <div className='tournament-container'>
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
              <animated.div className='tournament-content-qs-item' style={style}>
                <Question q={v} />
              </animated.div>
            );
          })}
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
}
