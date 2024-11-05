export const guest = {
  id: '954bd063-43d9-428b-aa3f-a716ad7aca7e',
  username: 'guest',
} as const;

export const serverRoutes = {
  tournaments: '/tournaments/',
  tournamentsGuest: '/tournaments/quest/',
  tournamentsCreateByLink: '/tournaments/createbylink/',
  tournamentsAllShort: `/tournaments/allshort/`,
  tournamentsLastShort: '/tournaments/last/',
  tournamentsRandom: '/tournaments/random/',
  tournamentsStats: '/tournaments/statistics',
  tournamentsAmountPages: '/tournaments/amountpages',
  tournamentsAllByUploader: '/tournaments/allbyuploader/',
  authLogin: '/auth/login/',
  authLogFirst: '/auth/logfirst/',
  authLogout: '/auth/logout',
  userResultShort: '/users/userresultshort/',
  users: '/users',
  userResultPost: '/users/userresult',
  wordleRandom: '/wordle/random-word',
  wordleCheckExist: '/wordle/check-exist/',
} as const;

export const baseUrl = 'https://andvarif.store/';
