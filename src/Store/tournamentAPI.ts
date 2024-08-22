import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TournamentShortType, TournamentType } from '../Types/tournament';
import { QuestionType } from '../Types/question';
import { baseUrl, guest, serverRoutes } from '../constants';

export const tournamentAPI = createApi({
  reducerPath: 'tournamentAPI',
  tagTypes: ['tournaments', 'shorts', 'stats', 'lastTournamentsShort'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  keepUnusedDataFor: 86400,

  endpoints: (build) => ({
    getTournament: build.query<TournamentType, string | number>({
      query: (id: string | number) => `/tournaments/${id}`,
    }),

    getTournamentsLastShort: build.query<TournamentShortType[], number>({
      query: (count: number) => serverRoutes.tournamentsLastShort + count,
      providesTags: ['lastTournamentsShort'],
    }),

    getRandom: build.query<QuestionType[], number>({
      query: (n: number) => `/tournaments/random/${n}`,
      keepUnusedDataFor: 1,
    }),

    getStats: build.query<{ tc: number; qc: number }, undefined>({
      query: () => serverRoutes.tournamentsStats,
      providesTags: ['stats'],
    }),

    getTournamentsAmountPages: build.query<number, undefined>({
      query: () => serverRoutes.tournamentsAmountPages,
      providesTags: ['stats'],
    }),

    getTournamentsShort: build.query<TournamentShortType[], undefined>({
      query: () => serverRoutes.tournamentsAllShort,
      providesTags: (result) => {
        return result
          ? [...result.map(({ id }) => ({ type: 'shorts' as const, id }))]
          : ['shorts'];
      },
    }),

    parseLink: build.mutation<TournamentType, { link: string }>({
      query: (body) => ({
        url: serverRoutes.tournamentsCreateByLink,
        method: 'POST',
        body,
      }),
    }),

    addTournament: build.mutation<number, TournamentType>({
      query: (body) => ({
        url:
          body.uploader === guest.username
            ? serverRoutes.tournamentsGuest
            : serverRoutes.tournaments,
        method: 'POST',
        credentials: 'include',
        body,
      }),
      invalidatesTags: ['shorts', 'stats', 'lastTournamentsShort'],
    }),

    getTournamentsAllByUploader: build.query<TournamentShortType[], string>({
      query: (userID) => serverRoutes.tournamentsAllByUploader + userID,
      providesTags: ['shorts'],
    }),
  }),
});

export const {
  usePrefetch,
  useGetTournamentQuery,
  useGetRandomQuery,
  useAddTournamentMutation,
  useParseLinkMutation,
  useGetTournamentsShortQuery,
  useGetStatsQuery,
  useGetTournamentsLastShortQuery,
  useGetTournamentsAmountPagesQuery,
  useGetTournamentsAllByUploaderQuery,
} = tournamentAPI;
