export function getWordToCheck(letters: string[], currentLetterNumber: number) {
  return letters.length > 0 && !(letters.length % 5) ? letters
      .slice(currentLetterNumber - 5, currentLetterNumber)
      .join('')
      .toLowerCase() : null;
}
