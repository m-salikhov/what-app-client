import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useInitialLogin } from 'src/Shared/Hooks/useInitialLogin';

interface Props {
  children: ReactNode;
}

export function PrivateRoute({ children }: Props) {
  const { currentUser } = useInitialLogin();

  if (!currentUser) {
    return <Navigate to='/' />;
  }
  return <>{children}</>;
}
