import { baseUrl, serverRoutes } from "Shared/Constants/constants";
import {
	type QuestionType,
	type TournamentShortType,
	TournamentShortTypeSchema,
	TournamentsLastShortSchema,
	type TournamentsLastShortType,
	type TournamentType,
	TournamentTypeSchema,
} from "Shared/Schemas/TournamentSchema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tournamentAPI = createApi({
	reducerPath: "tournamentAPI",
	tagTypes: ["tournaments", "shorts", "stats", "lastTournamentsShort"],
	baseQuery: fetchBaseQuery({ baseUrl }),
	keepUnusedDataFor: 3600,

	endpoints: (build) => ({
		getTournament: build.query<TournamentType, string | number>({
			query: (id: string | number) => `/tournaments/${id}`,
			responseSchema: TournamentTypeSchema,
		}),

		getTournamentsLastShort: build.query<
			TournamentsLastShortType,
			{ amount: number; page: number; withSkip: boolean }
		>({
			query: ({ amount, page, withSkip }) =>
				`${serverRoutes.tournamentsLastShort}?amount=${amount}&page=${page}&withSkip=${withSkip}`,
			responseSchema: TournamentsLastShortSchema,
			providesTags: ["shorts"],
		}),

		getRandom: build.query<QuestionType[], number>({
			query: (n: number) => `/tournaments/random/${n}`,
			keepUnusedDataFor: 1,
		}),

		getRandomTournament: build.query<TournamentShortType, string>({
			query: (userId: string) => `${serverRoutes.randomTournament}?userId=${userId}`,
			responseSchema: TournamentShortTypeSchema,
		}),

		getStats: build.query<{ tc: number; qc: number }, undefined>({
			query: () => serverRoutes.tournamentsStats,
			providesTags: ["stats"],
		}),

		getTournamentsAllShort: build.query<TournamentShortType[], undefined>({
			query: () => serverRoutes.tournamentsAllShort,
			responseSchema: TournamentShortTypeSchema.array(),
			providesTags: ["shorts"],
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
			invalidatesTags: ["shorts", "stats", "lastTournamentsShort"],
		}),

		getTournamentsAllByUploader: build.query<TournamentShortType[], string>({
			query: (userID) => ({
				url: serverRoutes.tournamentsAllByUploader + "/" + userID,
				credentials: "include",
			}),
			responseSchema: TournamentShortTypeSchema.array(),
			providesTags: ["shorts"],
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
