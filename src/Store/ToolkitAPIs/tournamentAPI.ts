import { serverRoutes } from "Shared/Constants/constants";
import {
	type QuestionType,
	type TournamentShortType,
	TournamentShortTypeSchema,
	TournamentsLastShortSchema,
	type TournamentsLastShortType,
	type TournamentType,
	TournamentTypeSchema,
} from "Shared/Schemas/TournamentSchema";
import { baseApi } from "./baseApi";
import { formatDate } from "Shared/Helpers/formatDate";

export const tournamentAPI = baseApi.injectEndpoints({
	overrideExisting: false,

	endpoints: (build) => ({
		getTournament: build.query<TournamentType, string | number>({
			query: (id: string) => `/tournaments/${id}`,
			responseSchema: TournamentTypeSchema,
		}),

		getTournamentsLastShort: build.query<
			TournamentsLastShortType,
			{ amount: number; page: number; withSkip: boolean }
		>({
			query: ({ amount, page, withSkip }) =>
				`${serverRoutes.tournamentsLastShort}?amount=${amount}&page=${page}&withSkip=${withSkip}`,
			responseSchema: TournamentsLastShortSchema,
			transformResponse: (response: TournamentsLastShortType) => {
				const tournaments = response.tournaments.map((tournament) => ({
					...tournament,
					date: formatDate(tournament.date),
					dateUpload: formatDate(tournament.dateUpload),
				}));

				return {
					...response,
					tournaments,
				};
			},
			providesTags: ["tournaments"],
		}),

		getRandom: build.query<QuestionType[], number>({
			query: (n: number) => `/tournaments/random/${n}`,
			keepUnusedDataFor: 15,
		}),

		getRandomTournament: build.query<TournamentShortType, string>({
			query: (userId: string) => `${serverRoutes.randomTournament}?userId=${userId}`,
			responseSchema: TournamentShortTypeSchema,
		}),

		getStats: build.query<{ tc: number; qc: number }, undefined>({
			query: () => serverRoutes.tournamentsStats,
			providesTags: ["tournaments"],
		}),

		getTournamentsAllShort: build.query<TournamentShortType[], undefined>({
			query: () => serverRoutes.tournamentsAllShort,
			responseSchema: TournamentShortTypeSchema.array(),
			transformResponse: (response: TournamentShortType[]) => {
				return response.map((tournament) => ({
					...tournament,
					date: formatDate(tournament.date),
					dateUpload: formatDate(tournament.dateUpload),
				}));
			},
			providesTags: ["tournaments"],
		}),

		parseLink: build.mutation<TournamentType, { link: string }>({
			query: (body) => ({
				url: serverRoutes.tournamentsCreateByLink,
				method: "POST",
				body,
			}),
			responseSchema: TournamentTypeSchema,
		}),

		addTournament: build.mutation<number, TournamentType>({
			query: (body) => ({
				url: serverRoutes.tournaments,
				method: "POST",
				body,
			}),
			invalidatesTags: ["tournaments"],
		}),

		getTournamentsAllByUploader: build.query<TournamentShortType[], string>({
			query: (userID) => ({
				url: `${serverRoutes.tournamentsAllByUploader}/${userID}`,
				credentials: "include",
			}),
			responseSchema: TournamentShortTypeSchema.array(),
			providesTags: ["tournaments"],
		}),
	}),
});

export const {
	usePrefetch,
	useGetTournamentQuery,
	useGetRandomQuery,
	useLazyGetRandomTournamentQuery,
	useAddTournamentMutation,
	useParseLinkMutation,
	useGetTournamentsAllShortQuery,
	useGetStatsQuery,
	useGetTournamentsLastShortQuery,
	useGetTournamentsAllByUploaderQuery,
} = tournamentAPI;
