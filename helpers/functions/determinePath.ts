export const getIsGame = (value: string) =>
  value === '/flashcards/[_id]' || value === '/write/[_id]';
export const getIsFlashcards = (value: string) => value === '/flashcards/[_id]';
export const getIsWrite = (value: string) => value === '/write/[_id]';
export const getIsDraft = (value: string) => value === '/edit/draft';
export const getIsSR = (value: string | string[]) => value === 'sr';
