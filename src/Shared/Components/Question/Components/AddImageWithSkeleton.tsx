import { useState } from "react";
import styles from "../question.module.css";
import type { QuestionType } from "Shared/Schemas/TournamentSchema";

interface Props {
	src: string;
	addMetadata: QuestionType["addMetadata"];
}

export function AddImageWithSkeleton({ src, addMetadata }: Props) {
	const [loaded, setLoaded] = useState(false);

	if (!addMetadata) {
		return <img src={src} alt="раздаточный материал" style={{ maxWidth: "100%" }} />;
	}

	const { width, height } = addMetadata;
	// Обработка ошибки загрузки: скрываем скелетон, показываем пустое место
	const handleError = () => setLoaded(true);

	return (
		<div className={styles.imageContainer} style={{ aspectRatio: `${width} / ${height}` }}>
			{!loaded && <div className={styles.skeleton} />}
			<img
				src={src}
				alt={"раздаточный материал"}
				className={styles.image}
				style={{ display: loaded ? "block" : "none" }}
				onLoad={() => setLoaded(true)}
				onError={handleError}
			/>
		</div>
	);
}
