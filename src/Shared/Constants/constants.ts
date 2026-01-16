export const serverRoutes = {
	tournaments: "tournaments",
	tournamentsCreateByLink: "tournaments/create-by-link",
	tournamentsAllShort: `tournaments/all-short`,
	tournamentsLastShort: "tournaments/paginate",
	tournamentsRandom: "tournaments/random",
	tournamentsStats: "tournaments/statistics",
	tournamentsAllByUploader: "tournaments/all-by-uploader",
	tournamentsSearch: "tournaments/search",
	randomTournament: "tournaments/random-tournament",
	authLogin: "auth/login",
	authLogFirst: "auth/login-first",
	authLogout: "auth/logout",
	users: "users",
	userResultPost: "users/user-result",
	wordleRandom: "wordle/random-word",
	wordleCheckExist: "wordle/check-exist",
	userResultShort: (id: string) => `users/${id}/user-result-short`,
	userResultFull: (id: string) => `users/${id}/user-result-full`,
	usersChangePassword: (id: string) => `users/${id}/change-password`,
} as const;

export const baseUrl = "https://andvarifserv.ru";
