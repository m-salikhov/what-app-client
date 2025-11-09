import { serverRoutes } from "Shared/Constants/constants";
import {
	ResultFullSchema,
	type ResultFullType,
	type ResultType,
} from "Shared/Schemas/ResultSchema";
import { UserSchema, type UserType } from "Shared/Schemas/UserSchema";
import type { UserLogin, UserReg } from "Store/Types/userApi.types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./toolkitAPI.config";

export const userAPI = createApi({
	reducerPath: "userAPI",
	baseQuery,
	tagTypes: ["result", "user"],
	keepUnusedDataFor: 86400,

	endpoints: (build) => ({
		getCurrentUser: build.query<UserType | undefined, undefined>({
			query: () => serverRoutes.authLogFirst,
			responseSchema: UserSchema.optional(),
		}),

		logout: build.mutation<{ message: string }, void>({
			query: () => ({
				url: serverRoutes.authLogout,
				method: "POST",
			}),
		}),

		login: build.mutation<UserType, UserLogin>({
			query: (body) => ({
				url: serverRoutes.authLogin,
				method: "POST",
				body,
			}),
			responseSchema: UserSchema,
		}),

		registration: build.mutation<UserType, UserReg>({
			query: (body) => ({
				url: serverRoutes.users,
				method: "POST",
				body,
			}),
			responseSchema: UserSchema,
			invalidatesTags: ["user"],
		}),

		changePassword: build.mutation<string, { newPass: string; id: string }>({
			query: (body) => ({
				url: serverRoutes.usersChangePassword(body.id),
				method: "PUT",
				body: { newPass: body.newPass },
			}),
		}),

		getUserResultFull: build.query<ResultFullType[], string>({
			query: (userID) => serverRoutes.userResultFull(userID),
			responseSchema: ResultFullSchema.array(),

			providesTags: ["result"],
		}),

		postUserResult: build.mutation<ResultFullType, Omit<ResultType, "id" | "date">>({
			query: (body) => ({
				url: serverRoutes.userResultPost,
				method: "POST",
				body,
			}),
			invalidatesTags: ["result"],
		}),
	}),
});

export const {
	useGetCurrentUserQuery,
	useLogoutMutation,
	useLoginMutation,
	useRegistrationMutation,
	useGetUserResultFullQuery,
	usePostUserResultMutation,
	useChangePasswordMutation,
} = userAPI;
