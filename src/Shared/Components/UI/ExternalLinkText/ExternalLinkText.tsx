import styles from "./external-link.module.css";

interface Props {
	text: string;
	href: string;
}

export function ExternalLinkText({ text, href }: Props) {
	return (
		<a className={styles.externalLink} href={href} target="_blank" rel="noreferrer">
			{text}
		</a>
	);
}
