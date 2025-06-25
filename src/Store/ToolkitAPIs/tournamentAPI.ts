import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, serverRoutes, guest } from 'Shared/Constants/constants';
import {
  QuestionType,
  TournamentShortTypeSchema,
  TournamentsLastShortSchema,
  TournamentsLastShortType,
} from 'Shared/Schemas/TournamentSchema';
import { TournamentShortType, TournamentType, TournamentTypeSchema } from 'Shared/Schemas/TournamentSchema';

export const tournamentAPI = createApi({
  reducerPath: 'tournamentAPI',
  tagTypes: ['tournaments', 'shorts', 'stats', 'lastTournamentsShort'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  keepUnusedDataFor: 86400,

  endpoints: (build) => ({
    getTournament: build.query<TournamentType, string | number>({
      query: (id: string | number) => `/tournaments/${id}`,
      transformResponse: (response: unknown) => {
        const result = TournamentTypeSchema.parse(response);

        return result;
      },
    }),

    getTournamentsLastShort: build.query<TournamentsLastShortType, { amount: number; page: number; withSkip: boolean }>(
      {
        query: ({ amount, page, withSkip }) =>
          serverRoutes.tournamentsLastShort + `/last?amount=${amount}&page=${page}&withSkip=${withSkip}`,
        transformResponse: (response) => {
          const result = TournamentsLastShortSchema.parse(response);

          return result;
        },
        providesTags: ['shorts'],
      }
    ),

    getRandom: build.query<QuestionType[], number>({
      query: (n: number) => `/tournaments/random/${n}`,
      keepUnusedDataFor: 1,
    }),

    getRandomTournament: build.query<TournamentShortType, string>({
      query: (userId: string) => `${serverRoutes.randomTournament}/${userId}`,
    }),

    getStats: build.query<{ tc: number; qc: number }, undefined>({
      query: () => serverRoutes.tournamentsStats,
      providesTags: ['stats'],
    }),

    getTournamentsAllShort: build.query<TournamentShortType[], undefined>({
      query: () => serverRoutes.tournamentsAllShort,
      transformResponse: (response: unknown) => {
        const result = TournamentShortTypeSchema.array().parse(response);

        return result;
      },
      providesTags: ['shorts'],
    }),

    parseLink: build.mutation<TournamentType, { link: string }>({
      query: (body) => ({
        url: serverRoutes.tournamentsCreateByLink,
        method: 'POST',
        body,
      }),
      transformResponse: (response: unknown) => {
        const result = TournamentTypeSchema.parse(response);

        return result;
      },
    }),

    addTournament: build.mutation<number, TournamentType>({
      query: (body) => ({
        url: body.uploader === guest.username ? serverRoutes.tournamentsGuest : serverRoutes.tournaments,
        method: 'POST',
        credentials: 'include',
        body,
      }),
      invalidatesTags: ['shorts', 'stats', 'lastTournamentsShort'],
    }),

    getTournamentsAllByUploader: build.query<TournamentShortType[], string>({
      query: (userID) => serverRoutes.tournamentsAllByUploader + '/' + userID,
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
  useGetTournamentsAllShortQuery,
  useGetStatsQuery,
  useGetTournamentsLastShortQuery,
  useGetTournamentsAllByUploaderQuery,
} = tournamentAPI;
