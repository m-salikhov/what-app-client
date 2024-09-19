export function getWordToCheck(letters: string[], currentLetterNumber: number) {
  if (letters.length > 0 && !(letters.length % 5)) {
    return letters
      .slice(currentLetterNumber - 5, currentLetterNumber)
      .join('')
      .toLowerCase();
  } else return null;
}
