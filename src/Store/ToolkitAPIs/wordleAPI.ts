import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, serverRoutes } from '../../constants';

export const wordleAPI = createApi({
  reducerPath: 'wordleAPI',
  baseQuery: fetchBaseQuery({ baseUrl }),
  keepUnusedDataFor: 10,

  endpoints: (build) => ({
    getRandomWord: build.query<{ word: string }, undefined>({
      query: () => serverRoutes.wordleRandom,
    }),

    checkWordExist: build.query<{ isExist: boolean; word: string }, string>({
      query: (word) => serverRoutes.wordleCheckExist + `check?word=${word}`,
    }),
  }),
});

export const { useCheckWordExistQuery, useGetRandomWordQuery } = wordleAPI;
