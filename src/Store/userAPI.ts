import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, routes } from "../constants";
import { FormUser, Result, UserAuth, UserType } from "../Types/user";
import { TournamentShortType } from "../Types/tournament";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  tagTypes: ["result"],
  keepUnusedDataFor: 86400,
  endpoints: (build) => ({
    getUserLogfirst: build.query<UserType, undefined>({
      query: () => routes.authLogFirst,
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
        url: routes.users,
        method: "POST",
        body,
      }),
    }),

    changePassword: build.mutation<string, { newPass: string; id: string }>({
      query: (body) => ({
        url: routes.users,
        method: "PUT",
        body,
      }),
    }),

    getUserResultShort: build.query<Result[], string>({
      query: (userID) => routes.userResultShort + userID,
      providesTags: ["result"],
    }),

    postUserResult: build.mutation<Result, Omit<Result, "id" | "date">>({
      query: (body) => ({
        url: routes.userResultPost,
        method: "POST",
        body,
      }),
      invalidatesTags: ["result"],
    }),
  }),
});

export const {
  useGetUserLogfirstQuery,
  useGetUserLogoutQuery,
  useLazyGetUserLogoutQuery,
  useLoginMutation,
  useRegistrationMutation,
  useGetUserResultShortQuery,
  usePostUserResultMutation,
  useChangePasswordMutation,
} = userAPI;
