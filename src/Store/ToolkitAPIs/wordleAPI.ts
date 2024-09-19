import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, serverRoutes } from '../../constants';

export const wordleAPI = createApi({
  reducerPath: 'wordleAPI',
  baseQuery: fetchBaseQuery({ baseUrl }),
  keepUnusedDataFor: 3600,

  endpoints: (build) => ({
    getRandomWord: build.query<{ word: string }, undefined>({
      query: () => serverRoutes.wordleRandom,
    }),

    check: build.mutation<{ isExist: boolean; word: string }, string>({
      query: (word) => ({
        url: serverRoutes.wordleCheckExist + `check?word=${word}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetRandomWordQuery, useCheckMutation } = wordleAPI;
