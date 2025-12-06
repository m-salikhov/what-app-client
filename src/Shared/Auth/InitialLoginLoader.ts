import { store } from "Store/store";
import { userAPI } from "Store/ToolkitAPIs/userAPI";

export async function initialLoginLoader() {
	const rememberMeFlag = localStorage.getItem("rememberMe");

	if (!rememberMeFlag) {
		await store.dispatch(userAPI.util.upsertQueryData("getCurrentUser", undefined, undefined));
		return null;
	}

	const { isError } = await store.dispatch(userAPI.endpoints.getCurrentUser.initiate(undefined));

	if (isError) {
		localStorage.removeItem("rememberMe");
		await store.dispatch(userAPI.util.upsertQueryData("getCurrentUser", undefined, undefined));
	}

	return null;
}
