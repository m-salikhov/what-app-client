import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getDate } from '../../Helpers/getDate';
import Question from '../Elements/Question/Question';
import Back from '../Elements/Back/Back';
import { useDocTitle } from '../../Hooks/useDocTitle';
import { getToursParagraphs, scroll } from './scrollLogic';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useGetTornamentsQuery } from '../../Store/tournamentAPI';
import { initTournament } from '../../Helpers/initValues';
import extractServerErrorMessage from '../../Helpers/extractServerErrorMessage';
import './tournament.scss';

function Tournament() {
  const { id = '' } = useParams();
  const { data: t = initTournament, isSuccess, error } = useGetTornamentsQuery(id);
  const ref = useRef(null);

  useDocTitle(t.title);

  if (error) {
    return (
      <main>
        {' '}
        <h2>{extractServerErrorMessage(error)}</h2>{' '}
      </main>
    );
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <main className='tournament__container'>
      <div className='tournament__header'>
        <div className='tournament__header-t'>
          <h2>{t.title}</h2>
          <p>
            <span>добавил </span>
            {t.uploader}
          </p>
        </div>
        <div className='tournament__header-m'>
          <h3>
            Дата отыгрыша: <span>{getDate(t.date)}</span>
          </h3>
          <h3>
            Туры: <span>{t.tours}</span>
          </h3>
          <h3>
            Вопросы: <span>{t.questionsQuantity}</span>
          </h3>
        </div>
        <h3>
          Редакция: <span>{t.editors.join(', ')}</span>
        </h3>
      </div>
      <div className='tournament__content' ref={ref}>
        <div className='tournament__content_header'>
          {' '}
          <div className='back'>
            <Back />
          </div>
          <div className='tournament__content_tours' onClick={(e) => scroll(e, ref.current, t)}>
            {getToursParagraphs(t.tours)}
          </div>
        </div>
        <TransitionGroup className='tournament__content_qs'>
          {isSuccess &&
            t.questions.map((v) => {
              return (
                <CSSTransition key={v.id} classNames='question' timeout={400}>
                  <Question q={v} />
                </CSSTransition>
              );
            })}
        </TransitionGroup>
      </div>
    </main>
  );
}

export default Tournament;
