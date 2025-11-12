import { serverRoutes } from "Shared/Constants/constants";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./toolkitAPI.config";

export const wordleAPI = createApi({
	reducerPath: "wordleAPI",
	baseQuery,
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
