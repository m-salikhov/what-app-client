import { useWindowSize } from "Shared/Hooks/useWindowSize";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useHeaderNavigation() {
	const [isOpenMobMenu, setIsOpenMobMenu] = useState(false);
	const { isDesktop } = useWindowSize();
	const { pathname } = useLocation();

	const handleMobMenu = () => {
		if (isDesktop) return;
		document.body.style.overflow = isOpenMobMenu ? "visible" : "hidden";
		setIsOpenMobMenu((prev) => !prev);
	};

	useEffect(() => {
		if (isDesktop) return;

		if (pathname) {
			document.body.style.overflow = "visible";
			setIsOpenMobMenu(false);
		}
	}, [pathname, isDesktop]);

	useEffect(() => {
		if (isDesktop || !isOpenMobMenu) return;

		const handleEscape = (event: KeyboardEvent) => {
			event.stopImmediatePropagation();

			if (event.key === "Escape" && isOpenMobMenu) {
				document.body.style.overflow = "visible";
				setIsOpenMobMenu(false);
			}
		};
		document.addEventListener("keydown", handleEscape);

		return () => document.removeEventListener("keydown", handleEscape);
	}, [isDesktop, isOpenMobMenu]);

	return { isOpenMobMenu, handleMobMenu, isDesktop };
}
