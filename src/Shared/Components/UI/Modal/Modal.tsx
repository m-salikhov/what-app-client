import { animated, useTransition } from "@react-spring/web";
import { type PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";
import { scrollVisibility } from "./Helpers/scrollVisibility";
import styles from "./modal.module.css";

interface Props {
	active: boolean;
	onClose: () => void;
	onKeyDown?: (event: KeyboardEvent) => void;
	onElementDestroyed?: () => void;
}

//HOC для модальных окон.
export function Modal({
	active,
	onClose,
	onElementDestroyed,
	onKeyDown,
	children,
}: PropsWithChildren<Props>) {
	const transition = useTransition(active, {
		from: {
			scale: 0.8,
			opacity: 0.5,
		},
		enter: {
			scale: 1,
			opacity: 1,
		},
		leave: {
			scale: 0.8,
			opacity: 0.5,
		},

		onDestroyed() {
			if (!active) {
				scrollVisibility("show");
			}

			if (onElementDestroyed && !active) {
				onElementDestroyed();
			}
		},

		config: { duration: 200 },
	});

	useEffect(() => {
		if (active) {
			scrollVisibility("hide");
		}
	}, [active]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
				return;
			}

			onKeyDown?.(event);
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose, onKeyDown]);

	return (
		<>
			{createPortal(
				transition((style, active) =>
					active ? (
						// biome-ignore lint/a11y/useKeyWithClickEvents: TODO
						<dialog
							className={styles.modal}
							onClick={(e) => {
								if (e.target === e.currentTarget) {
									onClose();
								}
							}}
						>
							<animated.div className={styles.content} style={style}>
								{children}
							</animated.div>
						</dialog>
					) : null,
				),
				document.body,
			)}
		</>
	);
}
