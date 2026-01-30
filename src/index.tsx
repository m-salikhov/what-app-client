import { store } from "Store/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "src/Router/AppRouter";
import "Shared/Styles/style.css";
import { ThemeProvider } from "Shared/Context/ThemeContext";
import "Store/ToolkitAPIs/Config/registeredAPIs";
import { createRoot } from "react-dom/client";

if (import.meta.env.DEV) {
	import("react-scan").then(({ scan }) => {
		scan({
			enabled: true,
		});
	});
}

const root = createRoot(document.querySelector("#root") as HTMLElement);
root.render(
	<ThemeProvider>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</ThemeProvider>,
);
