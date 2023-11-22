import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useGetUserLogfirstQuery } from "../Store/userAPI";

interface Props {
  children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { data: currentUser } = useGetUserLogfirstQuery(undefined);

  if (!currentUser) {
    return <Navigate to="/entry" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
