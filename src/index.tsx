import { store } from "Store/store";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "src/Router/AppRouter";
import "Shared/Styles/style.css";
import { ThemeProvider } from "Shared/Context/ThemeContext";

if (import.meta.env.DEV) {
	import("react-scan").then(({ scan }) => {
		scan({
			enabled: true,
		});
	});
}

const root = ReactDOM.createRoot(document.querySelector("#root") as HTMLElement);
root.render(
	<ThemeProvider>
		<Provider store={store}>
			<RouterProvider
				router={router}
				future={{
					v7_startTransition: true,
				}}
			/>
		</Provider>
	</ThemeProvider>,
);
