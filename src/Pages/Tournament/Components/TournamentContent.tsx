import { animated, useTransition } from '@react-spring/web';
import { useRef } from 'react';
import { TournamentType } from 'Shared/Schemas/TournamentSchema';
import { getToursParagraphs, scrollTournament } from '../Helpers/scrollLogic';
import { Question } from 'Shared/Components/Question/Question';
import styles from '../tournament.module.css';
import { Back } from 'Shared/Components/Back/Back';

export default function TournamentContent({ tournament }: { tournament: TournamentType }) {
  const ref = useRef(null);

  const transitions = useTransition(tournament.questions, {
    from: { opacity: 0, transform: 'scale(0.8) translateY(5rem)' },
    enter: { opacity: 1, transform: 'scale(1) translateY(0)' },
    config: { duration: 400 },
    keys: (q) => q.id,
  });

  return (
    <div ref={ref} data-type='question'>
      <Back />
      <div className={styles.tours} onClick={(e) => scrollTournament(e, ref.current, tournament)}>
        {getToursParagraphs(tournament.tours)}
      </div>

      {transitions((style, v) => {
        return (
          <animated.div className={styles.question} style={style}>
            <Question q={v} />
          </animated.div>
        );
      })}
    </div>
  );
}
