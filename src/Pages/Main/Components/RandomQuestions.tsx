import { Question } from "Shared/Components/Question/Question";
import { SkeletonQuestion } from "Shared/Components/Question/SkeletonQuestion";
import { useGetRandomQuery } from "Store/ToolkitAPIs/tournamentAPI";
import { useState } from "react";
import { HiRefresh } from "react-icons/hi";
import styles from "./main-components.module.css";

export function RandomQuestions() {
	const amountRandomQuestions = 4;

	const [isRandomRefetch, setIsRandomRefetch] = useState(false);

	const {
		data: randomQuestions = [],
		refetch,
		isLoading,
	} = useGetRandomQuery(amountRandomQuestions);

	return (
		<div className={styles.random}>
			<div className={styles.refreshContainer}>
				{" "}
				<div className={styles.refresh}>
					{" "}
					<h2>Случайные вопросы</h2>
					<button
						type="button"
						title="случайные вопросы"
						onClick={() => {
							refetch();
							setIsRandomRefetch(!isRandomRefetch);
						}}
					>
						<HiRefresh
							size={24}
							className={
								isRandomRefetch ? styles.refreshIcon : `${styles.refreshIcon} ${styles.rotate}`
							}
						/>
					</button>
				</div>
			</div>

			{isLoading && <SkeletonQuestion length={amountRandomQuestions} />}

			{!isLoading && randomQuestions.map((v) => <Question q={v} random={true} key={v.id} />)}
		</div>
	);
}
