import { useId, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RandomTournament } from "../RandomTournament/RandomTournament";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";
import TableTooltipDF from "./Components/TableTooltipDF";
import { useTableListManager } from "./Helpers/useTableListManager";
import styles from "./tournaments-table.module.css";
import { BsSearch as Search } from "react-icons/bs";
import { RiCloseLargeFill as Clear } from "react-icons/ri";
import { PaginationControl } from "../UI/PaginationControl/PaginationControl";
import { Spinner } from "../Spinner/Spinner";
import { useGetTableList } from "./Helpers/useGetTableList";

export function TournamentsTable({ amount }: { amount: number }) {
	const id = useId();
	const [currentPage, setCurrentPage] = useState(1);
	const [filterString, setFilterString] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const { tournaments, pageCount, queryState, handleSearch, hideSearchResult, showSearchResult } =
		useGetTableList(amount, currentPage);

	const { list, sortTournaments, sortField, sortDirection } = useTableListManager(tournaments);

	function handleInputClear() {
		if (filterString.length > 0) {
			setFilterString("");
		}

		if (queryState.searchSuccess) {
			hideSearchResult();
		}

		if (inputRef.current) {
			inputRef.current.focus();
		}
	}

	function inputOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			handleSearch(filterString);
		}

		if (e.key === "Escape") {
			handleInputClear();
		}
	}

	if (queryState.isError) return <h2>Ошибка при получении турниров</h2>;

	if (queryState.isLoading) return <Spinner />;

	return (
		<>
			{" "}
			<div className={styles.header}>
				<div className={styles.searchContainer}>
					<label className={styles.searchLabel}>
						<input
							type="text"
							name="tournaments-search"
							value={filterString}
							onChange={(e) => setFilterString(e.target.value)}
							onKeyDown={inputOnKeyDown}
							placeholder="поиск по названию"
							autoComplete="off"
							ref={inputRef}
						/>
					</label>
					<button
						className={styles.searchClear}
						type="button"
						title="очистить поиск"
						onClick={handleInputClear}
					>
						<Clear size="20" />
					</button>
					<button
						className={styles.searchIcon}
						type="button"
						title="поиск"
						onClick={() => handleSearch(filterString)}
					>
						<Search size="28" color="var(--h-color)" />
					</button>
				</div>

				<RandomTournament size="40" />
			</div>
			<PaginationControl
				currentPage={currentPage}
				totalPages={pageCount}
				onPageChange={setCurrentPage}
				isBlock={showSearchResult}
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
						{!showSearchResult && (
							<div className={styles.cell}>{i + 1 + (currentPage - 1) * amount}</div>
						)}
						{showSearchResult && <div className={styles.cell}>{i + 1}</div>}

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
