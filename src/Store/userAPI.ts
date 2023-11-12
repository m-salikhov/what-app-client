import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { routes } from "../constants";
import { FormUser, Result, UserAuth, UserType } from "../Types/user";
import { TournamentShortType } from "../Types/tournament";

const baseUrl = "https://andvarif.store";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),

  endpoints: (build) => ({
    getUserLogfirst: build.query<UserType, undefined>({
      query: () => routes.authLogFirst,
      keepUnusedDataFor: 86400,
    }),
    getUserLogout: build.query<{ message: string }, undefined>({
      query: () => routes.authLogout,
    }),
    login: build.mutation<UserType, UserAuth>({
      query: (body) => ({
        url: routes.authLogin,
        method: "POST",
        body,
      }),
    }),
    registration: build.mutation<UserType, FormUser>({
      query: (body) => ({
        url: routes.userRegistration,
        method: "POST",
        body,
      }),
    }),
    tournamentsAllByUploader: build.query<TournamentShortType[], string>({
      query: (userID) => routes.tournamentsAllByUploader + userID,
    }),
    getUserResultShort: build.query<Result[], string>({
      query: (userID) => routes.userResultShort + userID,
    }),
  }),
});

export const {
  useGetUserLogfirstQuery,
  useGetUserLogoutQuery,
  useLazyGetUserLogoutQuery,
  useLoginMutation,
  useRegistrationMutation,
  useTournamentsAllByUploaderQuery,
  useGetUserResultShortQuery,
} = userAPI;
