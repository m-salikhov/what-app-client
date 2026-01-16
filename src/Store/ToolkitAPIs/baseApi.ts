import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./Config/toolkitAPI.config";

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery,
	tagTypes: ["tournaments", "shorts", "stats", "lastTournamentsShort", "result", "user", "search"],
	keepUnusedDataFor: 60 * 60,
	endpoints: () => ({}),
});
