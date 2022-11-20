import { QuestionType } from "../Types/question";

function splitQuestion(str: string): Partial<QuestionType> {
  const normStr0 = str.replace(/Вопрос \d+:\s/, "");
  const normStr = normStr0.replace(/\n+/g, "");

  const iAnswer = normStr.indexOf("Ответ:");
  const iAlter = normStr.indexOf("Зачёт:");
  const iComment = normStr.indexOf("Комментарий:");
  const iSource = normStr.indexOf("Источник(и):");
  const iAuthor = normStr.indexOf("Автор:");

  const text = normStr.substring(0, iAnswer);

  let answer = "";
  if (iAlter > -1) {
    answer = normStr.substring(iAnswer + 7, iAlter);
  } else if (iComment > -1) {
    answer = normStr.substring(iAnswer + 7, iComment);
  } else {
    answer = normStr.substring(iAnswer + 7, iSource);
  }

  let alterAnswer = "";
  if (iAlter === -1) {
    alterAnswer = "";
  } else if (iComment > -1) {
    alterAnswer = normStr.substring(iAlter + 7, iComment);
  } else {
    alterAnswer = normStr.substring(iAlter + 7, iSource);
  }

  const comment =
    iComment > -1 ? normStr.substring(iComment + 13, iSource) : "";

  const author = normStr.substring(iAuthor + 7);

  const sourceStr = normStr.substring(iSource + 14, iAuthor);
  const oneOrManySources = /\s\d.\s/.test(sourceStr);
  let source: string[] = [];
  if (!oneOrManySources) {
    source.push(sourceStr);
  } else {
    const source0 = sourceStr.split(/\s\d.\s/);
    source = source0.map((v) => v.trim());
    source.shift();
  }

  let question: Partial<QuestionType> = {
    text,
    answer,
    alterAnswer,
    comment,
    source,
    author,
  };
  let key: keyof typeof question;
  for (key in question) {
    if (!question[key]) {
      delete question[key];
    }
  }

  return question;
}

export default splitQuestion;
