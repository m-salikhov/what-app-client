import { useWindowSize } from "Shared/Hooks/useWindowSize";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useHeaderNavigation() {
	const [isOpenMobMenu, setIsOpenMobMenu] = useState(false);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { isDesktop } = useWindowSize();

	function logoNavigate() {
		if (isDesktop && pathname === "/") {
			return;
		}

		if (isOpenMobMenu) {
			document.body.style.overflow = "visible";
			setIsOpenMobMenu(false);
		}

		if (isOpenMobMenu && pathname === "/") {
			return;
		}

		navigate("/");
	}

	const handleMobMenu = () => {
		if (isDesktop) return;

		document.body.style.overflow = isOpenMobMenu ? "visible" : "hidden";

		setIsOpenMobMenu((prev) => !prev);
	};

	return { isOpenMobMenu, logoNavigate, handleMobMenu, isDesktop };
}
