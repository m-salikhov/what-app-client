import { type ChangeEvent, type MouseEvent, useMemo, useState } from "react";
import * as z from "zod";
import type { EnrichedTournamentType } from "../TournamentsTable";

const sortFieldSchema = z.enum([
	"title",
	"date",
	"tours",
	"difficulty",
	"questionsQuantity",
	"uploader",
	"dateUpload",
]);
type SortFieldType = z.infer<typeof sortFieldSchema>;

export function useTournamentListManager(tournaments: EnrichedTournamentType[]) {
	const [filterString, setFilterString] = useState("");
	const [sortField, setSortField] = useState<SortFieldType>("dateUpload");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	const filteredList = useMemo(() => {
		if (filterString.length > 1) {
			return tournaments.filter((t) => t.title.toLowerCase().includes(filterString.toLowerCase()));
		} else {
			return tournaments;
		}
	}, [tournaments, filterString]);

	const list = useMemo(() => {
		if (
			sortField === "uploader" ||
			sortField === "title" ||
			sortField === "dateUpload" ||
			sortField === "date"
		) {
			return [...filteredList].sort((a, b) =>
				sortDirection === "asc"
					? b[sortField].localeCompare(a[sortField])
					: a[sortField].localeCompare(b[sortField]),
			);
		} else {
			return [...filteredList].sort((a, b) =>
				sortDirection === "asc" ? b[sortField] - a[sortField] : a[sortField] - b[sortField],
			);
		}
	}, [sortDirection, sortField, filteredList]);

	function sortTournaments(e: MouseEvent<HTMLButtonElement | SVGElement>) {
		const field = sortFieldSchema.parse(e.currentTarget.dataset.field);
		setSortField(field);
		setSortDirection(sortDirection === "asc" ? "desc" : "asc");
	}

	function handleChangeFilterString(event: ChangeEvent<HTMLInputElement>) {
		const str = event.target.value;
		setFilterString(str);
	}

	return {
		list,
		handleChangeFilterString,
		filterString,
		sortTournaments,
		sortField,
		sortDirection,
	};
}
