import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useInitialLoginQuery } from '../Store/ToolkitAPIs/userAPI';

interface Props {
  children: ReactNode;
}

function PrivateRoute({ children }: Props) {
  const { data: currentUser } = useInitialLoginQuery(undefined);

  if (!currentUser) {
    return <Navigate to='/entry' />;
  }
  return <>{children}</>;
}

export default PrivateRoute;
