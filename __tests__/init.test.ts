import type { TournamentShortType } from "Shared/Schemas/TournamentSchema";
import { expect, test } from "vitest";
import { allshort } from "./__fixtures__/allshort";

test("server", async () => {
	const response = await fetch("https://andvarifserv.ru/tournaments/allshort");
	const ts: TournamentShortType[] = await response.json();
	expect(ts[0].title).toBe(allshort[0].title);
});
