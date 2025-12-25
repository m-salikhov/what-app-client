import { useTheme } from "Shared/Context/ThemeContext";
import type { TournamentShortType } from "Shared/Schemas/TournamentSchema";
import { type ChangeEvent, type MouseEvent, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import * as z from "zod";
import { linkBuilder } from "../../../Helpers/linkBuilder";
import { getDifficultyBGC } from "./getDifficultyBGC";

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
type ListTournamentType = TournamentShortType & { innerLink: string; difficultyBGC: string };

export function useTournamentListManager(tournaments: TournamentShortType[]) {
	const { theme } = useTheme();
	const { pathname } = useLocation();
	const [filterString, setFilterString] = useState("");
	const [sortField, setSortField] = useState<SortFieldType>("dateUpload");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	//дополняем список внутренними ссылками и цветом ячейки со сложностью
	const memoList: ListTournamentType[] = useMemo(() => {
		return tournaments.map((el) => ({
			...el,
			innerLink: linkBuilder(el.id, pathname),
			difficultyBGC: getDifficultyBGC(el.difficulty, theme),
		}));
	}, [tournaments, theme, pathname]);

	//фильтрация и сортировка
	const list = useMemo(() => {
		let result: ListTournamentType[] = [];

		if (filterString.length > 1) {
			result = [...memoList].filter((t) =>
				t.title.toLowerCase().includes(filterString.toLowerCase()),
			);
		} else {
			result = memoList;
		}

		if (
			sortField === "uploader" ||
			sortField === "title" ||
			sortField === "dateUpload" ||
			sortField === "date"
		) {
			return [...result].sort((a, b) =>
				sortDirection === "asc"
					? b[sortField].localeCompare(a[sortField])
					: a[sortField].localeCompare(b[sortField]),
			);
		} else {
			return [...result].sort((a, b) =>
				sortDirection === "asc" ? b[sortField] - a[sortField] : a[sortField] - b[sortField],
			);
		}
	}, [sortDirection, sortField, memoList, filterString]);

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
