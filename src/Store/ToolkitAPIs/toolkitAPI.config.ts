import { baseUrl } from "Shared/Constants/constants";
import { type BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";

const rawBaseQuery = fetchBaseQuery({
	baseUrl,
	credentials: "include",
});

const baseQuery: BaseQueryFn = async (args, api, extraOptions) => {
	let url = typeof args === "string" ? args : args.url;
	let modifiedArgs = args;

	// Добавляем параметр для тестирования
	if (process.env.NODE_ENV === "test") {
		const testParam = "e2e-test=true";

		if (url.includes("?")) {
			url = `${url}&${testParam}`;
		} else {
			url = `${url}?${testParam}`;
		}
	}

	// Обновляем аргументы для передачи в оригинальный baseQuery
	if (typeof args === "string") {
		modifiedArgs = url;
	} else {
		modifiedArgs = { ...args, url: url };
	}

	return rawBaseQuery(modifiedArgs, api, extraOptions);
};

export { rawBaseQuery, baseQuery };
