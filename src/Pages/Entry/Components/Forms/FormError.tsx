import { extractApiErrorDetails } from "Shared/Helpers/extractApiErrorDetails";
import styles from "../../entry.module.css";

interface Props {
	error: unknown;
}

export function FormError({ error }: Props) {
	if (!error) return null;

	const message = typeof error === "string" ? error : extractApiErrorDetails(error).message;

	return (
		<div className={styles.error} role="alert">
			<div className={styles.errorBlock}></div>
			<p>{message}</p>
		</div>
	);
}
