import type { TournamentShortType } from "Shared/Schemas/TournamentSchema";
import { useId, useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { RandomTournament } from "../RandomTournament/RandomTournament";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";
import TableTooltipDF from "./Components/TableTooltipDF";
import { useTournamentListManager } from "./Helpers/useTournamentListManager";
import styles from "./tournaments-table.module.css";
import { getDifficultyClass } from "./Helpers/getDifficultyClass";
import { useTheme } from "Shared/Context/ThemeContext";
import { linkBuilder } from "Shared/Helpers/linkBuilder";
import { useGetTournamentsLastShortQuery } from "Store/ToolkitAPIs/tournamentAPI";
import { PaginationControl } from "../UI/PaginationControl/PaginationControl";
import { Spinner } from "../Spinner/Spinner";

export type EnrichedTournamentType = TournamentShortType & {
	eternalLink: string;
	background: string;
};

export function TournamentsTable({ amount = 10 }: { amount?: number }) {
	const id = useId();
	const { theme } = useTheme();
	const { pathname } = useLocation();
	const [currentPage, setCurrentPage] = useState(1);

	const { data, isLoading, isError, isSuccess } = useGetTournamentsLastShortQuery({
		amount,
		page: currentPage,
		withSkip: true,
	});

	const enrichedTournaments = useMemo(() => {
		if (!data) return [];

		return data.tournaments.map((t) => ({
			...t,
			eternalLink: linkBuilder(t.id, pathname),
			background: getDifficultyClass(t.difficulty, theme),
		}));
	}, [data, pathname, theme]);

	const {
		list,
		handleChangeFilterString,
		filterString,
		sortTournaments,
		sortField,
		sortDirection,
	} = useTournamentListManager(enrichedTournaments);

	if (isError) return <h2>Ошибка при получении турниров</h2>;

	if (isLoading) return <Spinner />;

	if (!isSuccess) return null;

	return (
		<>
			{" "}
			<div className={styles.header}>
				<label className={styles.search}>
					<input
						type="text"
						name="tournaments-search"
						value={filterString}
						onChange={handleChangeFilterString}
						placeholder="поиск"
						autoComplete="off"
					/>
				</label>
				<RandomTournament size="40" />
			</div>
			<PaginationControl
				currentPage={currentPage}
				totalPages={data?.pageCount || 0}
				onPageChange={setCurrentPage}
			/>
			<div className={styles.table}>
				<div className={styles.headerLine}>
					<div className={styles.headerCell}>
						<div className={styles.headerCellNumber}>
							<span>№</span>
						</div>
					</div>

					<div className={styles.headerCell}>
						<button
							type="button"
							className={styles.headerCellBtn}
							data-field="title"
							onClick={sortTournaments}
						>
							<span>НАЗВАНИЕ</span>
							<div className={styles.headerCellIcon}>
								{sortField === "title" && sortDirection === "asc" && <FaChevronDown />}
								{sortField === "title" && sortDirection === "desc" && <FaChevronUp />}
							</div>{" "}
						</button>
					</div>

					<div className={styles.headerCell}>
						<button
							type="button"
							className={styles.headerCellBtn}
							data-field="date"
							onClick={sortTournaments}
						>
							<span>ДАТА</span>
							<div className={styles.headerCellIcon}>
								{sortField === "date" && sortDirection === "asc" && <FaChevronDown />}
								{sortField === "date" && sortDirection === "desc" && <FaChevronUp />}
							</div>{" "}
						</button>
					</div>

					<div className={styles.headerCell}>
						<button
							type="button"
							className={styles.headerCellBtn}
							data-field="difficulty"
							onClick={sortTournaments}
						>
							<span data-tooltip-id={`tooltip-df-${id}`}>DF</span>
							<TableTooltipDF id={`tooltip-df-${id}`} />
							<div className={styles.headerCellIcon}>
								{sortField === "difficulty" && sortDirection === "asc" && <FaChevronDown />}
								{sortField === "difficulty" && sortDirection === "desc" && <FaChevronUp />}
							</div>{" "}
						</button>
					</div>

					<div className={styles.headerCell}>
						<button
							type="button"
							className={styles.headerCellBtn}
							data-field="questionsQuantity"
							onClick={sortTournaments}
						>
							<span>ВОПРОСЫ</span>
							<div className={styles.headerCellIcon}>
								{sortField === "questionsQuantity" && sortDirection === "asc" && <FaChevronDown />}
								{sortField === "questionsQuantity" && sortDirection === "desc" && <FaChevronUp />}
							</div>{" "}
						</button>
					</div>

					<div className={styles.headerCell}>
						<button
							type="button"
							className={styles.headerCellBtn}
							data-field="tours"
							onClick={sortTournaments}
						>
							<span>ТУРЫ</span>
							<div className={styles.headerCellIcon}>
								{sortField === "tours" && sortDirection === "asc" && <FaChevronDown />}
								{sortField === "tours" && sortDirection === "desc" && <FaChevronUp />}
							</div>{" "}
						</button>
					</div>

					<div className={styles.headerCell}>
						<button
							type="button"
							className={styles.headerCellBtn}
							data-field="dateUpload"
							onClick={sortTournaments}
						>
							<span>ДОБАВЛЕН</span>
							<div className={styles.headerCellIcon}>
								{sortField === "dateUpload" && sortDirection === "asc" && <FaChevronDown />}
								{sortField === "dateUpload" && sortDirection === "desc" && <FaChevronUp />}
							</div>{" "}
						</button>
					</div>

					<div className={styles.headerCell}>
						<button
							type="button"
							className={styles.headerCellBtn}
							data-field="uploader"
							onClick={sortTournaments}
						>
							<span>ДОБАВИЛ</span>
							<div className={styles.headerCellIcon}>
								{sortField === "uploader" && sortDirection === "asc" && <FaChevronDown />}
								{sortField === "uploader" && sortDirection === "desc" && <FaChevronUp />}
							</div>{" "}
						</button>
					</div>
				</div>

				{list.map((item, i) => (
					<div className={styles.line} key={item.id}>
						<div className={styles.cell}>{i + 1 + (currentPage - 1) * amount}</div>
						<div className={styles.cell}>
							<Link to={item.eternalLink}>{item.title}</Link>
						</div>
						<div className={styles.cell}>{item.date}</div>
						<div className={`${styles.cell} ${styles[item.background]}`}>
							<p className={styles.difficultyText}>
								{item.difficulty <= 0 ? "-" : item.difficulty}
							</p>
						</div>
						<div className={styles.cell}>{item.questionsQuantity}</div>
						<div className={styles.cell}>{item.tours}</div>
						<div className={styles.cell}>{item.dateUpload}</div>
						<div className={styles.cell}>{item.uploader}</div>
					</div>
				))}
			</div>
			<ScrollToTop />
		</>
	);
}
