import { Footer } from "Shared/Components/Footer/Footer";
import { Header } from "Shared/Components/Headers/Header";
import { Outlet, useLocation } from "react-router-dom";

export function Layout() {
	const { pathname } = useLocation();

	const hideFooter = /playmode/.test(pathname);

	return (
		<>
			<Header />

			<main>
				<Outlet />
			</main>

			{!hideFooter && <Footer />}
		</>
	);
}
