import {
	type TournamentShortType,
	TournamentShortTypeSchema,
} from "Shared/Schemas/TournamentSchema";
import { baseApi } from "Store/ToolkitAPIs/baseApi";

export const adminAPI = baseApi.injectEndpoints({
	overrideExisting: false,

	endpoints: (build) => ({
		getDrafts: build.query<TournamentShortType[] | undefined, undefined>({
			query: () => "tournaments/drafts",
			responseSchema: TournamentShortTypeSchema.array(),
		}),
	}),
});

export const { useGetDraftsQuery } = adminAPI;
