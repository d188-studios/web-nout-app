import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes, useAuth } from '~/features/auth';
import { Editor } from '~/features/editor';

export function AppRoutes() {
  const { authenticated } = useAuth();

  return (
    <Routes>
      {authenticated ? (
        <>
          <Route index element={<Editor />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="*" element={<Navigate to="/auth/sign-in" />} />
        </>
      )}
    </Routes>
  );
}
