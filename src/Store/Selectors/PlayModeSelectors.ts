import { RootState } from 'Store/store';
import { createSelector } from 'reselect';

export const stepPM = (state: RootState) => state.playModeReducer.step;
export const answerTimerPM = (state: RootState) => state.playModeReducer.answerTimer;
export const currentQuestionIndexPM = (state: RootState) => state.playModeReducer.currentQuestionIndex;
export const currentTourNumberPM = (state: RootState) => state.playModeReducer.currentTourNumber;
export const questionTimerPM = (state: RootState) => state.playModeReducer.questionTimer;
export const resultPM = (state: RootState) => state.playModeReducer.result;
export const selectedResultQuestionPM = (state: RootState) => state.playModeReducer.selectedResultQuestion;
export const totalAnsweredCountPM = (state: RootState) => state.playModeReducer.totalAnsweredCount;
export const withTimerPM = (state: RootState) => state.playModeReducer.withTimer;
export const totalQuestionsCountPM = (state: RootState) => state.playModeReducer.totalQuestionsCount;

export const timerOptions = createSelector(
  [withTimerPM, answerTimerPM, questionTimerPM],
  (withTimer, answerTimer, questionTimer) => ({
    withTimer,
    answerTimer,
    questionTimer,
  })
);

export const finalResult = createSelector(
  [totalAnsweredCountPM, totalQuestionsCountPM, resultPM, selectedResultQuestionPM],
  (totalAnsweredCount, totalQuestionsCount, result, selectedResultQuestion) => ({
    totalAnsweredCount,
    totalQuestionsCount,
    result,
    selectedResultQuestion,
  })
);
