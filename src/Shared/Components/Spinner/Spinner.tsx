import { RotatingLines } from "react-loader-spinner";
import styles from "./spinner.module.css";

type SpinnerProps = Parameters<typeof RotatingLines>[0];

const defaultProps: SpinnerProps = {
	strokeColor: "#61a199e6",
	strokeWidth: "3",
	animationDuration: "0.75",
	width: "80",
	visible: true,
};

export function Spinner(props: SpinnerProps) {
	return (
		<div className={styles.spinner}>
			<RotatingLines {...{ ...defaultProps, ...props }} />
		</div>
	);
}
