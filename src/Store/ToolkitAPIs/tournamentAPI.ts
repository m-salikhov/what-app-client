import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, serverRoutes, guest } from 'Common/Constants/constants';
import { QuestionType } from 'Common/Types/question';
import { TournamentType, TournamentShortType } from 'Common/Types/tournament';
import { TournamentsLastShort } from 'Store/Types/tournamentAPI.types';

export const tournamentAPI = createApi({
  reducerPath: 'tournamentAPI',
  tagTypes: ['tournaments', 'shorts', 'stats', 'lastTournamentsShort'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  keepUnusedDataFor: 86400,

  endpoints: (build) => ({
    getTournament: build.query<TournamentType, string | number>({
      query: (id: string | number) => `/tournaments/${id}`,
    }),

    getTournamentsLastShort: build.query<TournamentsLastShort, { amount: number; page: number; withSkip: boolean }>({
      query: ({ amount, page, withSkip }) =>
        serverRoutes.tournamentsLastShort + `/last?amount=${amount}&page=${page}&withSkip=${withSkip}`,
      providesTags: (result) => {
        return result
          ? [
              ...result.tournaments.map(({ id }) => ({
                type: 'shorts' as const,
                id,
              })),
              'shorts',
            ]
          : ['shorts'];
      },
    }),

    getRandom: build.query<QuestionType[], number>({
      query: (n: number) => `/tournaments/random/${n}`,
      keepUnusedDataFor: 1,
    }),

    getStats: build.query<{ tc: number; qc: number }, undefined>({
      query: () => serverRoutes.tournamentsStats,
      providesTags: ['stats'],
    }),

    getTournamentsAllShort: build.query<TournamentShortType[], undefined>({
      query: () => serverRoutes.tournamentsAllShort,
      providesTags: (result) => {
        return result ? [...result.map(({ id }) => ({ type: 'shorts' as const, id })), 'shorts'] : ['shorts'];
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
