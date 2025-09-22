import { Tooltip } from "react-tooltip";
import styles from "../tournaments-table.module.css";

export default function TableTooltipDF({ anchor }: { anchor: string }) {
	return (
		<Tooltip anchorSelect={`#${anchor}`} place="bottom" opacity={1}>
			<div className={styles.tooltip}>
				<h3>сложность:</h3>
				<p>{`< 3 - очень легко`} </p>
				<p>3 - 4 - легко</p>
				<p>4 - 5 - средне</p>
				<p>5 - 6 - сложно</p>
				<p>{`> 6 - очень сложно`}</p>
			</div>
		</Tooltip>
	);
}
