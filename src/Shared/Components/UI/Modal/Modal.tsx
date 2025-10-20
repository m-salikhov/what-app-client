import { animated, useTransition } from "@react-spring/web";
import { type PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { scrollVisibility } from "./Helpers/scrollVisibility";
import styles from "./modal.module.css";

interface Props {
	active: boolean;
	onClose: () => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLDialogElement>) => void;
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
	const dialogRef = useRef<HTMLDialogElement>(null);

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

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
		onKeyDown?.(event);

		if (event.key === "Escape") {
			onClose();
			return;
		}
	};

	useEffect(() => {
		scrollVisibility("hide");

		if (dialogRef.current) {
			dialogRef.current.focus();
		}
	}, []);

	return (
		<>
			{createPortal(
				transition((style, active) =>
					active ? (
						<dialog
							className={styles.modal}
							ref={dialogRef}
							open={active}
							onClick={(e) => {
								if (e.target === e.currentTarget) {
									onClose();
								}
							}}
							onKeyDown={handleKeyDown}
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
