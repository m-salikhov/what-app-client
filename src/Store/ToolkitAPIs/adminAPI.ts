import {
	type TournamentShortType,
	TournamentShortTypeSchema,
} from "Shared/Schemas/TournamentSchema";
import { baseApi } from "Store/ToolkitAPIs/baseApi";

export interface ChangeTournamentStatusBody {
	id: number;
	status: TournamentShortType["status"];
}

export const adminAPI = baseApi.injectEndpoints({
	overrideExisting: false,

	endpoints: (build) => ({
		getDrafts: build.query<TournamentShortType[] | undefined, undefined>({
			query: () => "tournaments/drafts",
			responseSchema: TournamentShortTypeSchema.array(),
			providesTags: ["drafts"],
		}),

		changeTournamentStatus: build.mutation<ChangeTournamentStatusBody, ChangeTournamentStatusBody>({
			query: (body) => ({
				url: "tournaments/change-status",
				method: "PATCH",
				body,
			}),
			invalidatesTags: ["drafts"],
		}),
	}),
});

export const { useGetDraftsQuery, useChangeTournamentStatusMutation } = adminAPI;
