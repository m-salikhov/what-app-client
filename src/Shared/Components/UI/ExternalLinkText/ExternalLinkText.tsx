import styles from "./external-link.module.css";

interface Props {
	text: string;
	href: string;
	extraClass?: string;
}

export function ExternalLinkText({ text, href, extraClass }: Props) {
	return (
		<a
			className={extraClass ? `${styles.externalLink} ${extraClass}` : styles.externalLink}
			href={href}
			target="_blank"
			rel="noreferrer"
		>
			{text}
		</a>
	);
}
