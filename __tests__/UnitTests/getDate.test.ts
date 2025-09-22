import { getDate, getDateYYYY_MM_DD } from "Shared/Helpers/getDate";
import { describe, expect, test } from "vitest";

describe("getDateYYYY_MM_DD", () => {
	test("should return correct date", () => {
		const date = new Date("2022-06-01");
		expect(getDateYYYY_MM_DD(date.getTime())).toBe("2022-06-01");
	});
});

describe("getDate", () => {
	test("should return correct date", () => {
		const date = new Date("2022-06-01");
		const dateStr = "1654041600000";
		const dateNum = 1654041600000;
		expect(getDate(dateStr)).toBe("01.06.2022");
		expect(getDate(dateNum)).toBe("01.06.2022");
		expect(getDate(date)).toBe("01.06.2022");
	});
});
