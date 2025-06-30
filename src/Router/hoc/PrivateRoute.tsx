import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetCurrentUserQuery } from 'Store/ToolkitAPIs/userAPI';

interface Props {
  children: ReactNode;
}

export function PrivateRoute({ children }: Props) {
  const { data: currentUser } = useGetCurrentUserQuery(undefined);

  if (!currentUser) {
    return <Navigate to='/' />;
  }
  return <>{children}</>;
}
