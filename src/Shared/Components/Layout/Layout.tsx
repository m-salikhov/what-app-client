import { Footer } from "Shared/Components/Footer/Footer";
import { Header } from "Shared/Components/Headers/Header";
import { Outlet } from "react-router-dom";

export function Layout() {
	return (
		<>
			<Header />

			{/* якорь для прокрутки к началу */}
			<div id="main-start" />

			<main>
				<Outlet />
			</main>

			<Footer />
		</>
	);
}
