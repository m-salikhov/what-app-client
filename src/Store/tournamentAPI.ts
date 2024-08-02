import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TournamentShortType, TournamentType } from '../Types/tournament';
import { QuestionType } from '../Types/question';
import { baseUrl, guest, routes } from '../constants';

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
      query: (count: number) => routes.tournamentsLastShort + count,
      providesTags: ['lastTournamentsShort'],
    }),

    getRandom: build.query<QuestionType[], number>({
      query: (n: number) => `/tournaments/random/${n}`,
      keepUnusedDataFor: 1,
    }),

    getStats: build.query<{ tc: number; qc: number }, undefined>({
      query: () => routes.tournamentsStats,
      providesTags: ['stats'],
    }),

    getTournamentsAmountPages: build.query<number, undefined>({
      query: () => routes.tournamentsAmountPages,
      providesTags: ['stats'],
    }),

    getTornamentsShort: build.query<TournamentShortType[], undefined>({
      query: () => routes.tournamentsAllShort,
      providesTags: (result) => {
        return result ? [...result.map(({ id }) => ({ type: 'shorts' as const, id })), 'shorts'] : ['shorts'];
      },
    }),

    parseLink: build.mutation<TournamentType, { link: string }>({
      query: (body) => ({
        url: routes.tournamentsCreateByLink,
        method: 'POST',
        body,
      }),
    }),

    addTournament: build.mutation<number, TournamentType>({
      query: (body) => ({
        url: body.uploader === guest.username ? routes.tournamentsGuest : routes.tournaments,
        method: 'POST',
        credentials: 'include',
        body,
      }),
      invalidatesTags: ['shorts', 'stats', 'lastTournamentsShort'],
    }),

    getTournamentsAllByUploader: build.query<TournamentShortType[], string>({
      query: (userID) => routes.tournamentsAllByUploader + userID,
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
  useGetTornamentsShortQuery,
  useGetStatsQuery,
  useGetTournamentsLastShortQuery,
  useGetTournamentsAmountPagesQuery,
  useGetTournamentsAllByUploaderQuery,
} = tournamentAPI;
