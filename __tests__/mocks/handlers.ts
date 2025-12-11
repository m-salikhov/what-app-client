import { HttpResponse, http } from "msw";
import { allshort } from "../__fixtures__/allshort.fixture";
import {
	lastTournamentsFirstCall,
	lastTournamentsSecondCall,
} from "../__fixtures__/lastTournaments.fixture";
import { questions } from "../__fixtures__/questions.fixture";
import { statsFixture } from "../__fixtures__/stats.fixture";

export const handlers = [
	http.get("https://example.com/user", () => {
		return HttpResponse.json({
			id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
			firstName: "John",
			lastName: "Maverick",
		});
	}),

	http.get("https://andvarifserv.ru/tournaments/allshort", () => {
		return HttpResponse.json(allshort);
	}),

	http.get("https://andvarifserv.ru/tournaments/statistics", () => {
		return HttpResponse.json(statsFixture);
	}),

	http.get("https://andvarifserv.ru/tournaments/last", ({ request }) => {
		const url = new URL(request.url);
		const page = url.searchParams.get("page");

		if (page === "1") {
			return HttpResponse.json(lastTournamentsFirstCall);
		}

		if (page === "2") {
			return HttpResponse.json(lastTournamentsSecondCall);
		}
	}),

	http.get("https://andvarifserv.ru/tournaments/random/4", () => {
		return HttpResponse.json(questions.slice(0, 4));
	}),

	http.post("https://andvarifserv.ru/auth/login", async ({ request }) => {
		const body: { email: string; password: string } = await request.clone().json();

		if (body.email === "test-error@ya.ru") {
			return new HttpResponse(null, { status: 400 });
		}

		return HttpResponse.json({
			id: "123e4567-e89b-12d3-a456-426655440000",
			date: 1111,
			email: "example@ya.ru",
			username: "example@ya.ru",
			role: "user",
		});
	}),

	http.get("https://andvarifserv.ru/auth/login-first", async () => {
		return HttpResponse.json({
			id: "123e4567-e89b-12d3-a456-426655440000",
			date: 1111,
			email: "example@ya.ru",
			username: "example@ya.ru",
			role: "user",
		});
	}),

	http.post<{ email: string; password: string } | { username: string; password: string }>(
		"https://andvarifserv.ru/users",
		async ({ request }) => {
			const body: {
				email: string;
				username: string;
				password: string;
				date: number;
			} = await request.clone().json();

			if (body.email === "test-error@ya.ru") {
				return new HttpResponse(null, { status: 400 });
			}

			return HttpResponse.json({
				id: "123e4567-e89b-12d3-a456-426655440000",
				date: 1111,
				email: "example@ya.ru",
				username: "example@ya.ru",
				role: "user",
			});
		},
	),
];
