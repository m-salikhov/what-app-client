import { useEffect, useState } from "react";
import { BsArrowUpSquareFill as ArrowUp } from "react-icons/bs";
import styles from "./scroll-to-top.module.css";

export function ScrollToTop({ targetSelector = "#main-start" }: { targetSelector?: string }) {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const target = document.querySelector(targetSelector);
		if (!target) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				// если элемент div "#main-start" не виден, то показываем кнопку
				setVisible(!entry.isIntersecting);
			},
			{
				threshold: 1,
			},
		);

		observer.observe(target);

		return () => observer.disconnect();
	}, [targetSelector]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	if (!visible) return null;

	return (
		<button
			type="button"
			className={styles.scroll}
			onClick={scrollToTop}
			aria-label="Scroll to top"
		>
			<ArrowUp size={36} />
		</button>
	);
}
