import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, serverRoutes } from 'Common/Constants/constants';
import { UserType, Result } from 'Common/Types/user';
import { UserLogin, UserReg } from 'Store/Types/userApi.types';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
  tagTypes: ['result'],
  keepUnusedDataFor: 86400,

  endpoints: (build) => ({
    getCurrentUser: build.query<UserType, undefined>({
      query: () => serverRoutes.authLogFirst,
    }),

    logout: build.query<{ message: string }, undefined>({
      query: () => serverRoutes.authLogout,
    }),

    login: build.mutation<UserType, UserLogin>({
      query: (body) => ({
        url: serverRoutes.authLogin,
        method: 'POST',
        body,
      }),
    }),

    registration: build.mutation<UserType, UserReg>({
      query: (body) => ({
        url: serverRoutes.users,
        method: 'POST',
        body,
      }),
    }),

    changePassword: build.mutation<string, { newPass: string; id: string }>({
      query: (body) => ({
        url: serverRoutes.users,
        method: 'PUT',
        body,
      }),
    }),

    getUserResultShort: build.query<Result[], string>({
      query: (userID) => serverRoutes.userResultShort + '/' + userID,
      providesTags: ['result'],
    }),

    postUserResult: build.mutation<Result, Omit<Result, 'id' | 'date'>>({
      query: (body) => ({
        url: serverRoutes.userResultPost,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['result'],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useLogoutQuery,
  useLazyLogoutQuery,
  useLoginMutation,
  useRegistrationMutation,
  useGetUserResultShortQuery,
  usePostUserResultMutation,
  useChangePasswordMutation,
} = userAPI;
