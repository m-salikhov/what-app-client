import { serverRoutes } from "Shared/Constants/constants";
import { baseApi } from "./baseApi";

export const wordleAPI = baseApi.injectEndpoints({
	overrideExisting: false,

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
