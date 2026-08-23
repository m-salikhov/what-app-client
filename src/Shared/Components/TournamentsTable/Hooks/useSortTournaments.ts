import { type MouseEvent, useMemo, useState } from "react";
import * as z from "zod";
import type { TournamentShortType } from "Shared/Schemas/TournamentSchema";

const sortFieldMap = {
	title: "title",
	date: "date",
	dateUpload: "dateUpload",
	tours: "tours",
	questionsQuantity: "questionsQuantity",
	difficulty: "difficulty",
	uploader: "uploader",
} as const;

const sortFieldSchema = z.enum(Object.values(sortFieldMap));

type SortFieldType = z.infer<typeof sortFieldSchema>;

const compareDates = (str1: string, str2: string) => {
	const [d1, m1, y1] = str1.split(".").map(Number);
	const [d2, m2, y2] = str2.split(".").map(Number);
	const date1 = new Date(y1, m1 - 1, d1);
	const date2 = new Date(y2, m2 - 1, d2);
	if (date1 < date2) return -1;
	if (date1 > date2) return 1;
	return 0;
};

export function useSortTournaments(tournaments: TournamentShortType[]) {
	const [sortField, setSortField] = useState<SortFieldType>("dateUpload");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	const tournamentsSorted = useMemo(() => {
		if (sortField === "dateUpload" || sortField === "date") {
			return [...tournaments].sort((a, b) =>
				sortDirection === "asc"
					? compareDates(b[sortField], a[sortField])
					: compareDates(a[sortField], b[sortField]),
			);
		} else if (sortField === "uploader" || sortField === "title") {
			return [...tournaments].sort((a, b) =>
				sortDirection === "asc"
					? b[sortField].localeCompare(a[sortField])
					: a[sortField].localeCompare(b[sortField]),
			);
		} else {
			return [...tournaments].sort((a, b) =>
				sortDirection === "asc" ? b[sortField] - a[sortField] : a[sortField] - b[sortField],
			);
		}
	}, [sortDirection, sortField, tournaments]);

	function sortTournaments(e: MouseEvent<HTMLButtonElement | SVGElement>) {
		const field = e.currentTarget.dataset.field;
		const parsed = sortFieldSchema.safeParse(field);

		if (!parsed.success) {
			console.error("Unknown field");
			return;
		}

		setSortField(parsed.data);
		setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
	}

	return {
		tournamentsSorted,
		sortTournaments,
		sortField,
		sortDirection,
	};
}
