import { useTheme } from "Shared/Context/ThemeContext";
import { useState } from "react";
import styles from "./darkmode.module.css";
import Moon from "./Moon.svg?react";
import Sun from "./Sun.svg?react";

export function DarkMode() {
	const { theme, changeTheme } = useTheme();
	const [checked, setChecked] = useState(theme === "light" ? false : true);

	return (
		<div className={styles.container}>
			<input
				className={styles.input}
				title="Toggle dark mode"
				type="checkbox"
				id="darkmode-toggle"
				onClick={() => changeTheme()}
				onChange={() => setChecked(!checked)}
				checked={checked}
			/>
			<label className={styles.toggle} htmlFor="darkmode-toggle">
				<Sun className={styles.sun} />
				<Moon className={styles.moon} />
			</label>
		</div>
	);
}
