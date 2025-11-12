import { baseUrl } from "Shared/Constants/constants";
import { type BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query";

const rawBaseQuery = fetchBaseQuery({
	baseUrl,
	credentials: "include",
});

const baseQuery: BaseQueryFn = async (args, api, extraOptions) => {
	// если не тест, то возвращаем оригинальную функцию
	if (process.env.NODE_ENV !== "test") return rawBaseQuery(args, api, extraOptions);

	// в простых GET args=url, в прочих args - объект со свойством url
	let url = typeof args === "string" ? args : args.url;
	let modifiedArgs = args;

	// Добавляем параметр для тестирования
	const testParam = "e2e-test=true";
	if (url.includes("?")) {
		url = `${url}&${testParam}`;
	} else {
		url = `${url}?${testParam}`;
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
