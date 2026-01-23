import { HiArrowNarrowLeft as LeftArrow, HiArrowNarrowRight as RightArrow } from "react-icons/hi";
import styles from "./pagination-control.module.css";
import type { Dispatch, SetStateAction } from "react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	setCurrentPage: Dispatch<SetStateAction<number>>;
	show?: boolean;
}

export function PaginationControl({
	currentPage,
	totalPages,
	setCurrentPage,
	show = true,
}: PaginationProps) {
	if (!show) return null;

	const handlePrev = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	if (totalPages < 7) {
		return (
			<div className={styles.container}>
				<button
					className={styles.arrow}
					onClick={handlePrev}
					type="button"
					disabled={currentPage === 1}
					title="предыдущая страница"
				>
					<LeftArrow size={24} />
				</button>

				{Array.from({ length: totalPages }, (_, index) => (
					<button
						// biome-ignore lint/suspicious/noArrayIndexKey: <не меняется содержимое>
						key={index + 1}
						type="button"
						onClick={() => setCurrentPage(index + 1)}
						className={`${styles.page}  ${currentPage === index + 1 && styles.active}`}
					>
						{index + 1}
					</button>
				))}
				<button
					type="button"
					onClick={handleNext}
					disabled={currentPage === totalPages}
					title="следующая страница"
					className={styles.arrow}
				>
					<RightArrow size={24} />
				</button>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<button
				className={styles.arrow}
				onClick={handlePrev}
				type="button"
				disabled={currentPage === 1}
				title="предыдущая страница"
			>
				<LeftArrow size={24} />
			</button>

			<button
				type="button"
				onClick={() => setCurrentPage(1)}
				className={`${styles.page}  ${currentPage === 1 && styles.active}`}
			>
				1
			</button>

			{currentPage > 3 && <span className={styles.dots}>...</span>}

			{currentPage > 2 && (
				<button
					type="button"
					onClick={() => setCurrentPage(currentPage - 1)}
					className={styles.page}
				>
					{currentPage - 1}
				</button>
			)}

			{currentPage > 1 && currentPage < totalPages && (
				<button type="button" className={`${styles.page} ${styles.active}`}>
					{currentPage}
				</button>
			)}

			{currentPage < totalPages - 1 && (
				<button
					type="button"
					onClick={() => setCurrentPage(currentPage + 1)}
					className={styles.page}
				>
					{currentPage + 1}
				</button>
			)}

			{currentPage < totalPages - 2 && <span className={styles.dots}>...</span>}

			<button
				type="button"
				onClick={() => setCurrentPage(totalPages)}
				className={`${styles.page}  ${currentPage === totalPages && styles.active}`}
			>
				{totalPages}
			</button>

			<button
				type="button"
				onClick={handleNext}
				disabled={currentPage === totalPages}
				title="следующая страница"
				className={styles.arrow}
			>
				<RightArrow size={24} />
			</button>
		</div>
	);
}
