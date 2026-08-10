import { animated, useTransition } from "@react-spring/web";
import { type KeyboardEvent, type ComponentProps, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { scrollVisibility } from "./Helpers/scrollVisibility";
import styles from "./modal.module.css";

interface Props extends ComponentProps<"dialog"> {
	active: boolean;
	onClose?: () => void;
	onKeyDown?: (event: KeyboardEvent<HTMLDialogElement>) => void;
	onElementDestroyed?: () => void;
}

const focusableSelector =
	'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Modal({
	active,
	onClose,
	onElementDestroyed,
	onKeyDown,
	children,
	...props
}: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const focusableElementsRef = useRef<HTMLElement[]>([]);

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

	const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
		event.stopPropagation();

		if (onKeyDown) onKeyDown(event);

		if (event.key === "Tab") {
			const focusable = focusableElementsRef.current;

			if (!focusable.length) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const activeElement = document.activeElement;

			if (event.shiftKey) {
				if (activeElement === first || !dialogRef.current?.contains(activeElement)) {
					event.preventDefault();
					last.focus();
				}
			} else {
				if (activeElement === last) {
					event.preventDefault();
					first.focus();
				}
			}
		}

		if (event.key === "Escape") {
			if (onClose) onClose();
		}
	};

	useEffect(() => {
		if (!active || !dialogRef.current) return;

		scrollVisibility("hide");

		focusableElementsRef.current = Array.from(
			dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
		).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

		dialogRef.current.focus();
	}, [active]);

	return (
		<>
			{createPortal(
				transition((style, active) =>
					active ? (
						<dialog
							className={styles.modal}
							ref={dialogRef}
							open={active}
							tabIndex={-1}
							onClick={(e) => {
								if (e.target === e.currentTarget) {
									if (onClose) onClose();
								}
							}}
							onKeyDown={handleKeyDown}
							{...props}
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
