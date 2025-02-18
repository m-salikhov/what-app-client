import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, serverRoutes } from 'Shared/Constants/constants';
import { ResultFullSchema, ResultFullType, ResultSchema, ResultType } from 'Shared/Schemas/ResultSchema';
import { UserSchema, UserType } from 'Shared/Schemas/UserSchema';
import { UserLogin, UserReg } from 'Store/Types/userApi.types';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
  tagTypes: ['result'],
  keepUnusedDataFor: 86400,

  endpoints: (build) => ({
    getCurrentUser: build.query<UserType, undefined>({
      query: () => serverRoutes.authLogFirst,
      transformResponse: (response: unknown): UserType => {
        const result = UserSchema.parse(response);

        return result;
      },
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
      transformResponse: (response: unknown) => {
        const result = UserSchema.parse(response);

        return result;
      },
    }),

    registration: build.mutation<UserType, UserReg>({
      query: (body) => ({
        url: serverRoutes.users,
        method: 'POST',
        body,
      }),

      transformResponse: (response: unknown) => {
        const result = UserSchema.parse(response);

        return result;
      },
    }),

    changePassword: build.mutation<string, { newPass: string; id: string }>({
      query: (body) => ({
        url: serverRoutes.usersChangePassword,
        method: 'PUT',
        body,
      }),
    }),

    getUserResultShort: build.query<ResultType[], string>({
      query: (userID) => serverRoutes.userResultShort + '/' + userID,
      transformResponse: (response: unknown) => {
        const result = ResultSchema.array().parse(response);

        return result;
      },
      providesTags: ['result'],
    }),

    getUserResultFull: build.query<ResultFullType[], string>({
      query: (userID) => serverRoutes.userResultFull + '/' + userID,
      transformResponse: (response: unknown) => {
        const result = ResultFullSchema.array().parse(response);

        return result;
      },
      providesTags: ['result'],
    }),

    postUserResult: build.mutation<ResultFullType, Omit<ResultType, 'id' | 'date'>>({
      query: (body) => ({
        url: serverRoutes.userResultPost,
        method: 'POST',
        body,
      }),
      transformResponse: (response: unknown) => {
        const result = ResultFullSchema.parse(response);

        return result;
      },
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
  useGetUserResultFullQuery,
  usePostUserResultMutation,
  useChangePasswordMutation,
} = userAPI;
