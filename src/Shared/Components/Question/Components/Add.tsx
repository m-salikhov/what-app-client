import { useState } from "react";
import styles from "../question.module.css";

export function Add({ add }: { add: string }) {
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const isImage = add.startsWith("http");

	return (
		<div className={styles.razdatka}>
			<p>Раздаточный материал:</p>
			<div>
				{isImage && !isImageLoaded && <div style={{ height: "250px" }}></div>}

				{isImage && (
					<img
						src={add}
						alt="раздатка"
						style={{
							opacity: isImageLoaded ? 1 : 0,
						}}
						onLoad={() => setIsImageLoaded(true)}
					/>
				)}

				{!isImage && <p>{add}</p>}
			</div>
		</div>
	);
}
