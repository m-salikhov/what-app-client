export const serverRoutes = {
	tournaments: "tournaments",
	tournamentsCreateByLink: "tournaments/create-by-link",
	tournamentsAllShort: `tournaments/all-short`,
	tournamentsLastShort: "tournaments/last",
	tournamentsRandom: "tournaments/random",
	tournamentsStats: "tournaments/statistics",
	tournamentsAllByUploader: "tournaments/all-by-uploader",
	randomTournament: "tournaments/random-tournament",
	authLogin: "auth/login",
	authLogFirst: "auth/login-first",
	authLogout: "auth/logout",
	users: "users",
	userResultShort: (id: string) => `users/${id}/user-result-short`,
	userResultFull: (id: string) => `users/${id}/user-result-full`,
	usersChangePassword: (id: string) => `users/${id}/change-password`,
	userResultPost: "users/user-result",
	wordleRandom: "wordle/random-word",
	wordleCheckExist: "wordle/check-exist",
} as const;

export const baseUrl = "https://andvarifserv.ru";
