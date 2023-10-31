import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TournamentShortType, TournamentType } from "../Types/tournament";
import { QuestionType } from "../Types/question";
import { routes } from "../constants";

const baseUrl = "https://andvarif.store";

export const tournamentAPI = createApi({
  reducerPath: "tournamentAPI",
  tagTypes: ["tournaments", "shorts"],
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

    getTornamentsShort: build.query<TournamentShortType[], undefined>({
      query: () => routes.tournamentsAllShort,
      providesTags: (result) => {
        console.log({ result });
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
    }),

    addTournament: build.mutation<number, TournamentType>({
      query: (body) => ({
        url: "/tournaments",
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
} = tournamentAPI;
