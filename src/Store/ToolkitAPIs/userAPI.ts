import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, serverRoutes } from 'Shared/Constants/constants';
import { ResultFullSchema, ResultFullType, ResultType } from 'Shared/Schemas/ResultSchema';
import { UserSchema, UserType } from 'Shared/Schemas/UserSchema';
import { UserLogin, UserReg } from 'Store/Types/userApi.types';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include' }),
  tagTypes: ['result'],
  keepUnusedDataFor: 86400,

  endpoints: (build) => ({
    getCurrentUser: build.query<UserType | undefined, undefined>({
      query: () => serverRoutes.authLogFirst,
      transformResponse: (response: unknown): UserType | undefined => {
        if (!response) return undefined;

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
  useGetUserResultFullQuery,
  usePostUserResultMutation,
  useChangePasswordMutation,
} = userAPI;
