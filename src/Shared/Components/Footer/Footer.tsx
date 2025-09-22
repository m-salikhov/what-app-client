import styles from "./footer.module.css";
import Mail from "./icons/email.svg?react";
import Github from "./icons/github.svg?react";
import Telegram from "./icons/telegram.svg?react";

export function Footer() {
	return (
		<footer className={styles.footer}>
			<a
				href="https://t.me/DeFrag3"
				target="_blank"
				rel="noopener"
				title="Telegram"
				className={styles.link}
			>
				<Telegram />
			</a>

			<a
				href="https://github.com/m-salikhov"
				target="_blank"
				rel="noopener"
				title="Github"
				className={styles.link}
			>
				<Github className={styles.icon} />
			</a>

			<div className={styles.mail}>
				<Mail className={styles.icon} />
				<p> andvary@inbox.ru</p>
			</div>
		</footer>
	);
}
