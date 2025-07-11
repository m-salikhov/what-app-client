import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'Shared/Auth/useAuth';

interface Props {
  children: ReactNode;
}

export function PrivateRoute({ children }: Props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/' />;
  }
  return <>{children}</>;
}
