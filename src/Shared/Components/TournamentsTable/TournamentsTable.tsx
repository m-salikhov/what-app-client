import { useId } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";
import TableTooltipDF from "./Components/TableTooltipDF";
import styles from "./tournaments-table.module.css";
import { PaginationControl } from "../UI/PaginationControl/PaginationControl";
import { useTableManager } from "./Hooks/useTableManager";
import SearchByTitleInput from "./Components/SearchByTitleInput";
import { Spinner } from "../Spinner/Spinner";

export function TournamentsTable({ amountTournamentsOnPage }: { amountTournamentsOnPage: number }) {
	const id = useId();

	const {
		enrichedTournaments,
		sortTournaments,
		sortField,
		sortDirection,
		queryState,
		currentPage,
		handlePageChange,
		pageCount,
		handleSearch,
		showSearchResult,
	} = useTableManager(amountTournamentsOnPage);

	if (queryState.isError) return <h2>Ошибка при получении турниров</h2>;

	if (enrichedTournaments === undefined) return <Spinner />;

	if (enrichedTournaments.length === 0)
		return (
			<div className={styles.container}>
				<SearchByTitleInput handleSearch={handleSearch} />
				<h2>Нет турниров по запросы</h2>{" "}
			</div>
		);

	return (
		<div className={styles.container}>
			<SearchByTitleInput handleSearch={handleSearch} />

			<PaginationControl
				currentPage={currentPage}
				totalPages={pageCount}
				setCurrentPage={handlePageChange}
				show={!showSearchResult}
				isFetching={queryState.isFetching}
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

				{enrichedTournaments.length > 0 &&
					enrichedTournaments.map((item) => (
						<div className={styles.line} key={item.id}>
							<div className={styles.cell}>{item.tableIndex}</div>

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

			<PaginationControl
				currentPage={currentPage}
				totalPages={pageCount}
				setCurrentPage={handlePageChange}
				show={!showSearchResult}
				isFetching={queryState.isFetching}
			/>
			<ScrollToTop />
		</div>
	);
}
