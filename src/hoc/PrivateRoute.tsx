import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../Hooks/redux";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { currentUser } = useAppSelector((state) => state.userReducer);

  if (!currentUser) {
    return <Navigate to="/entry" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
