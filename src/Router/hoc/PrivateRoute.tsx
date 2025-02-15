import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useInitialLogin } from 'Common/Hooks/useInitialLogin';

interface Props {
  children: ReactNode;
}

function PrivateRoute({ children }: Props) {
  const { currentUser } = useInitialLogin();

  console.log('Private');

  if (!currentUser) {
    return <Navigate to='/' />;
  }
  return <>{children}</>;
}

export default PrivateRoute;
