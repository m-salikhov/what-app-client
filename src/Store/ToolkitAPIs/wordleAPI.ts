import { baseUrl, serverRoutes } from "Shared/Constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wordleAPI = createApi({
	reducerPath: "wordleAPI",
	baseQuery: fetchBaseQuery({ baseUrl }),
	keepUnusedDataFor: 3600,

	endpoints: (build) => ({
		getRandomWord: build.query<{ word: string }, undefined>({
			query: () => serverRoutes.wordleRandom,
		}),

		verifyWordInDB: build.mutation<{ isExist: boolean; word: string }, string>({
			query: (word) => ({
				url: `${serverRoutes.wordleCheckExist}?word=${word}`,
				method: "GET",
			}),
		}),
	}),
});

export const { useGetRandomWordQuery, useVerifyWordInDBMutation } = wordleAPI;
