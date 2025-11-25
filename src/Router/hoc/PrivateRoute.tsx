import { useAuth } from "Shared/Auth/useAuth";
import type { UserRoles } from "Shared/Schemas/UserSchema";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
	children: ReactNode;
	requiredRole: UserRoles;
}

export function PrivateRoute({ children, requiredRole }: Props) {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to="/" />;
	}

	if (requiredRole === "user") return <>{children}</>;

	if (requiredRole === "admin" && user.role === "admin") return <>{children}</>;

	return <Navigate to="/" />;
}
