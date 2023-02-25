import { TournamentType } from "../Types/tournament";

export default function checkTournament(t: TournamentType) {
  const errors = [];
  console.log("t", t);

  //блок проверки инфо о турнире
  if (!Boolean(t.date)) {
    errors.push("Не выбрана дата");
  }
  if (!Boolean(t.title)) {
    errors.push("Не добавлено название");
  }
  if (!Boolean(t.questionsQuantity)) {
    errors.push("Не выбрано кол-во вопросов");
  }
  if (!Boolean(t.tours)) {
    errors.push("Не выбрано кол-во туров");
  }
  if (!Boolean(t.editors[0])) {
    errors.push("Не указан редактор(ы)");
  }
  if (t.tours != t.questions.at(-1)?.tourNumber) {
    errors.push("Кол-во туров не соответсвует выбранному");
  }
  // if (t.questionsQuantity != t.questions.at(-1)?.qNumber) {
  //   errors.push("Неверная нумерация вопросов");
  // }
  if (t.questionsQuantity != t.questions.length) {
    errors.push("Кол-во вопросов не соответсвует выбранному");
  }

  //блок проверки вопросов
  t.questions.forEach((q) => {
    if (!Boolean(q.text)) {
      errors.push(`Не указан текст вопроса ${q.qNumber}`);
    }
    if (!Boolean(q.author)) {
      errors.push(`Не указан автор вопроса ${q.qNumber}`);
    }
    if (!Boolean(q.answer)) {
      errors.push(`Не указан ответ на вопрос ${q.qNumber}`);
    }
  });

  return errors.length > 0 ? errors : false;
}
