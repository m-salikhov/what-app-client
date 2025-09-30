import { getDate } from "Shared/Helpers/getDate";
import type { TournamentShortType } from "Shared/Schemas/TournamentSchema";
import { useId } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RandomTournament } from "../RandomTournament/RandomTournament";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";
import TableTooltipDF from "./Components/TableTooltipDF";
import { useTournamentListManager } from "./Helpers/useTournamentListManager";
import styles from "./tournaments-table.module.css";

export function TournamentsTable({ tournaments }: { tournaments: TournamentShortType[] }) {
	const id = useId();

	const {
		list,
		handleChangeFilterString,
		filterString,
		sortTournaments,
		sortField,
		sortDirection,
	} = useTournamentListManager(tournaments);

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
				<RandomTournament />
			</div>
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
						<div className={styles.cell}>{i + 1}</div>
						<div className={styles.cell}>
							<Link to={item.innerLink}>{item.title}</Link>
						</div>
						<div className={styles.cell}>{getDate(item.date)}</div>
						<div className={styles.cell} style={{ backgroundColor: item.difficultyBGC }}>
							<p>{item.difficulty <= 0 ? "-" : item.difficulty}</p>
						</div>
						<div className={styles.cell}>{item.questionsQuantity}</div>
						<div className={styles.cell}>{item.tours}</div>
						<div className={styles.cell}>{getDate(item.dateUpload)}</div>
						<div className={styles.cell}>{item.uploader}</div>
					</div>
				))}
			</div>
			<ScrollToTop />
		</>
	);
}
