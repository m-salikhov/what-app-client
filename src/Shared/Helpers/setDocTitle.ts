export function setDocTitle(title: string) {
  if (!title) {
    document.title = 'База вопросов';
  } else document.title = title;
}
