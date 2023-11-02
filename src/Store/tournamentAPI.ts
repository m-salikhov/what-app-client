import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TournamentShortType, TournamentType } from "../Types/tournament";
import { QuestionType } from "../Types/question";
import { guest, routes } from "../constants";

const baseUrl = "https://andvarif.store";

export const tournamentAPI = createApi({
  reducerPath: "tournamentAPI",
  tagTypes: ["tournaments", "shorts", "stats"],
  baseQuery: fetchBaseQuery({ baseUrl }),

  endpoints: (build) => ({
    getTornaments: build.query<TournamentType, string>({
      query: (id: string) => `/tournaments/${id}`,
      keepUnusedDataFor: 600,
    }),

    getRandom: build.query<QuestionType[], number>({
      query: (n: number) => `/tournaments/random/${n}`,
      keepUnusedDataFor: 1,
    }),

    getStats: build.query<{ tc: number; qc: number }, undefined>({
      query: () => routes.tournamentsStats,
      keepUnusedDataFor: 600,
      providesTags: ["stats"],
      // providesTags: (result) => {
      //   return result
      //     ? [{ ...result, type: "stats" as const }, "stats"]
      //     : ["stats"];
      // },
    }),

    getTornamentsShort: build.query<TournamentShortType[], undefined>({
      query: () => routes.tournamentsAllShort,
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: "shorts" as const, id })),
              "shorts",
            ]
          : ["shorts"];
      },
      keepUnusedDataFor: 600,
    }),

    parseLink: build.mutation<TournamentType, { link: string }>({
      query: (body) => ({
        url: routes.tournamentsCreateByLink,
        method: "POST",
        body,
      }),
      invalidatesTags: ["stats"],
    }),

    addTournament: build.mutation<number, TournamentType>({
      query: (body) => ({
        url:
          body.uploader === guest.userName
            ? routes.tournamentsGuest
            : routes.tournaments,
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["shorts"],
    }),
  }),
});

export const {
  useGetTornamentsQuery,
  useGetRandomQuery,
  useAddTournamentMutation,
  useParseLinkMutation,
  useGetTornamentsShortQuery,
  useGetStatsQuery,
} = tournamentAPI;
