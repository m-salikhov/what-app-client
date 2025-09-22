import { playModeActions } from "Store/Slices/PlayModeSlice";
import { store } from "Store/store";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Main } from "src/Pages/Main/Main";
import { Layout } from "src/Shared/Components/Layout/Layout";
import { Spinner } from "src/Shared/Components/Spinner/Spinner";
import { initialLoginLoader } from "../Shared/Auth/InitialLoginLoader";
import { PrivateRoute } from "./HOC/PrivateRoute";
import { wordleLoader } from "./Utils/wordleLoader";

const Entry = lazy(() => import("src/Pages/Entry/Entry"));
const AddTournamentLink = lazy(() => import("src/Pages/AddTournamentLink/AddTournamentLink"));
const List = lazy(() => import("src/Pages/PlayMode/List"));
const PlayMode = lazy(() => import("src/Pages/PlayMode/PlayMode"));
const Profile = lazy(() => import("src/Pages/Profile/Profile"));
const ProfileResultTable = lazy(
	() => import("src/Pages/Profile/Components/ProfileResultTable/ProfileResult"),
);
const NotFound = lazy(() => import("src/Pages/NotFound/NotFound"));
const AllTournaments = lazy(() => import("src/Pages/AllTournaments/AllTournaments"));
const About = lazy(() => import("src/Pages/About/About"));
const Wordle = lazy(() => import("src/Pages/Wordle/Wordle"));
const Tournament = lazy(() => import("src/Pages/Tournament/Tournament"));

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <Layout />,
			loader: initialLoginLoader,
			errorElement: <NotFound routerError={true} />,

			children: [
				{
					index: true,
					element: <Main />,
				},

				{
					path: "about",
					element: (
						<Suspense fallback={<Spinner />}>
							{" "}
							<About />{" "}
						</Suspense>
					),
				},

				{
					path: "addbylink",
					element: (
						<Suspense fallback={<Spinner />}>
							<AddTournamentLink />
						</Suspense>
					),
				},

				{
					path: "all",
					element: (
						<Suspense fallback={<Spinner />}>
							{" "}
							<AllTournaments />
						</Suspense>
					),
				},

				{
					path: "entry",
					element: (
						<Suspense fallback={<Spinner />}>
							<Entry />
						</Suspense>
					),
				},

				{
					path: "profile",
					children: [
						{
							index: true,
							element: (
								<PrivateRoute>
									<Suspense fallback={<Spinner />}>
										<Profile />
									</Suspense>
								</PrivateRoute>
							),
						},
						{
							path: ":tournamentId/:userId",
							element: (
								<PrivateRoute>
									<Suspense fallback={<Spinner />}>
										<ProfileResultTable />
									</Suspense>
								</PrivateRoute>
							),
						},
					],
				},

				{
					path: "wordle",
					loader: wordleLoader,
					element: (
						<Suspense fallback={<Spinner />}>
							<Wordle />
						</Suspense>
					),
				},

				{
					path: "playmode",
					children: [
						{
							index: true,
							element: (
								<Suspense fallback={<Spinner />}>
									<List />{" "}
								</Suspense>
							),
						},
						{
							path: ":id",
							element: (
								<Suspense fallback={<Spinner />}>
									<PlayMode />
								</Suspense>
							),
							loader: () => store.dispatch(playModeActions.resetState()),
						},
					],
				},

				{
					path: "tournament/:id",
					element: (
						<Suspense fallback={<Spinner />}>
							{" "}
							<Tournament />{" "}
						</Suspense>
					),
				},

				{
					path: "*",
					element: <NotFound routerError={false} />,
				},
			],
		},
	],
	{
		future: {
			v7_fetcherPersist: true,
			v7_normalizeFormMethod: true,
			v7_partialHydration: false,
			v7_relativeSplatPath: true,
			v7_skipActionErrorRevalidation: true,
		},
	},
);

export default router;
