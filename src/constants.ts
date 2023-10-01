export const guest = {
  id: "954bd063-43d9-428b-aa3f-a716ad7aca7e",
  userName: "quest",
} as const;

export const routes = {
  tournaments: "/tournaments/",
  tournamentsGuest: "/tournaments/quest/",
  tournamentsCreateByLink: "/tournaments/createbylink/",
  tournamentsAllShort: `/tournaments/allshort/`,
  tournamentsLast: "/tournaments/last/",
  authLogin: "/auth/login/",
  authLogFirst: "/auth/logfirst/",
  authLogout: "/auth/logout",
  tournamentsRandom: "/tournaments/random/",
  tournamentsStats: "/tournaments/statistics",
  tournamentsAllByUploader: "/tournaments/allbyuploader/",
  userResultShort: "/users/userresultshort",
} as const;

export const amountRandomQuestions = 4;

export const baseURL = "https://andvarif.store/";
