import { TournamentType } from '../Types/tournament';

export default function checkTournament(t: TournamentType) {
  const errors: string[] = [];

  //блок проверки инфо о турнире
  if (!t.date) {
    errors.push('Не выбрана дата');
  }
  if (!t.title) {
    errors.push('Не добавлено название');
  }
  if (!t.questionsQuantity) {
    errors.push('Не выбрано кол-во вопросов');
  }
  if (!t.tours) {
    errors.push('Не выбрано кол-во туров');
  }
  if (!t.editors[0]) {
    errors.push('Не указан редактор(ы)');
  }
  if (t.tours !== t.questions.at(-1)?.tourNumber) {
    errors.push('Кол-во туров не соответсвует выбранному');
  }
  // if (t.questionsQuantity != t.questions.at(-1)?.qNumber) {
  //   errors.push("Неверная нумерация вопросов");
  // }
  if (t.questionsQuantity !== t.questions.at(-1)?.qNumber) {
    errors.push('Кол-во вопросов не соответсвует выбранному');
  }

  //блок проверки вопросов
  t.questions.forEach((q) => {
    if (!q.text) {
      errors.push(`Не указан текст вопроса ${q.qNumber}`);
    }
    if (!q.author) {
      errors.push(`Не указан автор вопроса ${q.qNumber}`);
    }
    if (!q.answer) {
      errors.push(`Не указан ответ на вопрос ${q.qNumber}`);
    }
  });

  return errors.length > 0 ? errors : false;
}
