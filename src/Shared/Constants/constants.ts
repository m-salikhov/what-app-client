export const serverRoutes = {
  tournaments: 'tournaments',
  tournamentsGuest: 'tournaments/quest',
  tournamentsCreateByLink: 'tournaments/create-by-link',
  tournamentsAllShort: `tournaments/all-short`,
  tournamentsLastShort: 'tournaments/last',
  tournamentsRandom: 'tournaments/random',
  tournamentsStats: 'tournaments/statistics',
  tournamentsAllByUploader: 'tournaments/all-by-uploader',
  randomTournament: 'tournaments/random-tournament',
  authLogin: 'auth/login',
  authLogFirst: 'auth/logfirst',
  authLogout: 'auth/logout',
  userResultShort: 'users/user-result-short',
  userResultFull: 'users/user-result-full',
  users: 'users',
  usersChangePassword: 'users/change-password',
  userResultPost: 'users/user-result',
  wordleRandom: 'wordle/random-word',
  wordleCheckExist: 'wordle/check-exist',
} as const;

export const baseUrl = 'https://andvarifserv.ru';
