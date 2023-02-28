// import axios from "axios";
import { QuestionType } from "../Types/question";

// interface ShrtcodeRes {
//   ok: boolean;
//   result: {
//     code: string;
//     short_link: string;
//     full_short_link: string;
//     short_link2: string;
//     full_short_link2: string;
//     share_link: string;
//     full_share_link: string;
//     original_link: string;
//   };
// }

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

  let alterAnswer;
  if (iAlter === -1) {
    alterAnswer = "";
  } else if (iComment > -1) {
    alterAnswer = normStr.substring(iAlter + 7, iComment);
  } else {
    alterAnswer = normStr.substring(iAlter + 7, iSource);
  }

  const comment =
    iComment > -1 ? normStr.substring(iComment + 13, iSource) : "";

  const author = iAuthor > -1 ? normStr.substring(iAuthor + 7) : "";

  const sourceStr = normStr.substring(iSource + 13, iAuthor);
  const oneOrManySources = /\s\s\s\d.\s/.test(sourceStr);
  let source: string[] = [];
  if (!oneOrManySources) {
    source.push(sourceStr);
  } else {
    const source0 = sourceStr.split(/\s\s\s\d.\s/);
    source = source0.map((v) => v.trim());
    source.shift();
  }

  // let source = await Promise.all(
  //   sourceOriginal.map(async (v) => {
  //     if (v.length > 39 && /^http/.test(v)) {
  //       const shortLink = await axios
  //         .get<ShrtcodeRes>(`https://api.shrtco.de/v2/shorten?url=${v}`)
  //         .then((res) => {
  //           return res.data.result.short_link;
  //         })
  //         .catch((e: any) => console.log(e.response.data.message));
  //       if (typeof shortLink !== "string") {
  //         return "Источник не указан";
  //       }
  //       return shortLink;
  //     } else return v;
  //   })
  // );

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
