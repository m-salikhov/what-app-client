import { HiArrowNarrowLeft as LeftArrow, HiArrowNarrowRight as RightArrow } from "react-icons/hi";

import styles from "./pagination-control.module.css";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function PaginationControl({ currentPage, totalPages, onPageChange }: PaginationProps) {
	const handlePrev = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

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
				onClick={() => onPageChange(1)}
				className={`${styles.page}  ${currentPage === 1 && styles.active}`}
			>
				1
			</button>

			{currentPage > 3 && <span className={styles.dots}>...</span>}

			{currentPage > 2 && (
				<button type="button" onClick={() => onPageChange(currentPage - 1)} className={styles.page}>
					{currentPage - 1}
				</button>
			)}

			{currentPage > 1 && currentPage < totalPages && (
				<button type="button" className={`${styles.page} ${styles.active}`}>
					{currentPage}
				</button>
			)}

			{currentPage < totalPages - 1 && (
				<button type="button" onClick={() => onPageChange(currentPage + 1)} className={styles.page}>
					{currentPage + 1}
				</button>
			)}

			{currentPage < totalPages - 2 && <span className={styles.dots}>...</span>}

			<button
				type="button"
				onClick={() => onPageChange(totalPages)}
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
