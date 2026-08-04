/** biome-ignore-all lint/a11y/useKeyWithClickEvents: todo */
import { useAuth } from "Shared/Auth/useAuth";
import { DarkMode } from "Shared/Components/DarkMode/DarkMode";
import { usePrefetch } from "Store/ToolkitAPIs/tournamentAPI";
import { Squash as Hamburger } from "hamburger-react";
import { NavLink, Link } from "react-router-dom";
import styles from "./header.module.css";
import { useHeaderNavigation } from "./helpers/useHeaderNavigation";
import owlGreen from "./owlGreen.svg";

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
	`${styles.navLink} ${isActive ? styles.active : ""}`;

export function Header() {
	const prefetchTournaments = usePrefetch("getTournamentsLastShort");
	const { handleLogout, isAuthorized } = useAuth();
	const { handleMobMenu, isOpenMobMenu, isDesktop } = useHeaderNavigation();

	return (
		<header className={styles.header}>
			<div className={styles.logoContainer}>
				<Link to="/" className={styles.logo}>
					<img
						src={owlGreen}
						className={styles.logoImage}
						alt="Логотип Базы вопросов Что? Где? Когда?"
					/>
					<p className={styles.logoText}>База вопросов "Что? Где? Когда?"</p>
				</Link>
			</div>

			<nav
				className={`${styles.nav} ${isOpenMobMenu ? styles.mobMenu : ""}`}
				onClick={(e) => {
					if (e.target === e.currentTarget) handleMobMenu();
				}}
			>
				<ul className={styles.navList}>
					<li className={styles.navItem}>
						<DarkMode />
					</li>

					<li className={styles.navItem}>
						<NavLink to="/about" className={navLinkClassName}>
							О сайте
						</NavLink>
					</li>

					<li
						className={styles.navItem}
						onMouseEnter={() =>
							prefetchTournaments({
								amount: 50,
								page: 1,
								withSkip: true,
							})
						}
					>
						<NavLink to="/playmode" className={navLinkClassName}>
							Игровой режим
						</NavLink>
					</li>

					<li className={styles.navItem}>
						<NavLink to="/addbylink" className={navLinkClassName}>
							Добавить турнир
						</NavLink>
					</li>

					<li
						className={styles.navItem}
						onMouseEnter={() =>
							prefetchTournaments({
								amount: 50,
								page: 1,
								withSkip: true,
							})
						}
					>
						<NavLink to="/all" className={navLinkClassName}>
							Все турниры
						</NavLink>
					</li>

					{isAuthorized && (
						<li className={styles.navItem}>
							<NavLink to="/profile" className={navLinkClassName}>
								Профиль
							</NavLink>
						</li>
					)}

					{isAuthorized && (
						<li className={styles.navItem}>
							<button type="button" onClick={handleLogout} className={styles.logout}>
								Выйти
							</button>
						</li>
					)}

					{!isAuthorized && (
						<li className={styles.navItem}>
							<NavLink to="/entry" className={navLinkClassName}>
								Войти
							</NavLink>
						</li>
					)}
				</ul>
			</nav>

			{!isDesktop && (
				<button
					type="button"
					className={styles.burgerButton}
					onClick={handleMobMenu}
					aria-expanded={isOpenMobMenu}
					aria-controls="site-navigation"
					aria-label={isOpenMobMenu ? "Закрыть меню" : "Открыть меню"}
				>
					<Hamburger size={25} toggled={isOpenMobMenu} color="var(--h-color)" />
				</button>
			)}
		</header>
	);
}
