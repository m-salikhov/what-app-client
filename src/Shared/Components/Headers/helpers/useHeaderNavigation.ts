import { useWindowSize } from "Shared/Hooks/useWindowSize";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useHeaderNavigation() {
	const [isOpenMobMenu, setIsOpenMobMenu] = useState(false);
	const { isDesktop } = useWindowSize();
	const location = useLocation();

	const handleMobMenu = () => {
		if (isDesktop) return;

		document.body.style.overflow = isOpenMobMenu ? "visible" : "hidden";

		setIsOpenMobMenu((prev) => !prev);
	};

	useEffect(() => {
		if (isDesktop) return;
		if (location.pathname) setIsOpenMobMenu(false);
	}, [location.pathname, isDesktop]);

	useEffect(() => {
		if (isDesktop) return;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpenMobMenu(false);
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isDesktop]);

	return { isOpenMobMenu, handleMobMenu, isDesktop };
}
