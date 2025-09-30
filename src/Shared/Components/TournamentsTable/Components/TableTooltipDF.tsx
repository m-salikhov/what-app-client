import { Tooltip } from "react-tooltip";
import styles from "../tournaments-table.module.css";

export default function TableTooltipDF({ id }: { id: string }) {
	return (
		<Tooltip id={id} place="bottom" opacity={1}>
			<div className={styles.tooltip}>
				<h3 className={styles.tooltipText}>сложность:</h3>
				<p className={styles.tooltipText}>{`< 3 - очень легко`} </p>
				<p className={styles.tooltipText}>3 - 4 - легко</p>
				<p className={styles.tooltipText}>4 - 5 - средне</p>
				<p className={styles.tooltipText}>5 - 6 - сложно</p>
				<p className={styles.tooltipText}>{`> 6 - очень сложно`}</p>
			</div>
		</Tooltip>
	);
}
