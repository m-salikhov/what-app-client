import {
	useGetCurrentUserQuery,
	useLoginMutation,
	useLogoutMutation,
	useRegistrationMutation,
	userAPI,
} from "Store/ToolkitAPIs/userAPI";
import type { LoginType, RegistrationType } from "src/Pages/Entry/Schema/EntrySchema";
import { useAppDispatch } from "../Hooks/redux";

export function useAuth() {
	const dispatch = useAppDispatch();

	const { data: user } = useGetCurrentUserQuery(undefined);

	const [logout] = useLogoutMutation();
	const [login, loginState] = useLoginMutation();
	const [registration, registrationState] = useRegistrationMutation();

	const handleLogin = async (loginData: LoginType) => {
		try {
			const data = await login(loginData).unwrap();
			dispatch(userAPI.util.upsertQueryData("getCurrentUser", undefined, data));
			localStorage.setItem("rememberMe", "yes");
		} catch (_e) {}
	};

	const handleRegistration = async (registrationData: RegistrationType) => {
		const { confirmPassword: _, ...userData } = registrationData;
		try {
			const data = await registration(userData).unwrap();
			dispatch(userAPI.util.upsertQueryData("getCurrentUser", undefined, data));
			localStorage.setItem("rememberMe", "yes");
		} catch (_e) {}
	};

	const handleLogout = async () => {
		try {
			localStorage.removeItem("rememberMe");

			await logout(undefined);

			dispatch(userAPI.util.upsertQueryData("getCurrentUser", undefined, undefined));
		} catch (err) {
			console.error(err);
		}
	};

	return {
		user,
		handleLogout,
		handleLogin,
		loginState,
		handleRegistration,
		registrationState,
	};
}
