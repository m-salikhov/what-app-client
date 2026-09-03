import { useState } from "react";
import styles from "../question.module.css";

export function Add({ add }: { add: string }) {
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const isImage = add.startsWith("http");

	return (
		<div className={styles.razdatkaContainer}>
			<p>Раздаточный материал:</p>
			<div className={styles.razdatka}>
				{isImage && (
					<img
						className={isImageLoaded ? styles.loaded : ""}
						src={add}
						alt="раздатка"
						onLoad={() => setIsImageLoaded(true)}
					/>
				)}

				{!isImage && <p>{add}</p>}
			</div>
		</div>
	);
}
