import type { ComponentProps } from "react";
import styles from "./button.module.css";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "tiny" | "small" | "medium" | "large";

interface Props extends ComponentProps<"button"> {
	extraClass?: string;
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
}

export function Button({
	variant = "primary",
	size = "medium",
	extraClass = "",
	fullWidth = false,
	type = "button",
	children,
	...props
}: Props) {
	const classes = [
		styles.button,
		styles[`button-${variant}`],
		styles[`button-${size}`],
		fullWidth && styles["button-full-width"],
		extraClass,
	]
		.filter((el) => Boolean(el))
		.join(" ");

	return (
		<button type={type} className={classes} {...props}>
			{children}
		</button>
	);
}
