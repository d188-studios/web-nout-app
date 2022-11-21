import { Spin } from 'antd';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, Layout, Users } from '~/features/admin';
import {
  AuthRoutes,
  PasswordRecovery,
  useAuth,
  VerifyAccount,
} from '~/features/auth';
import { Editor } from '~/features/editor';

export function AppRoutes() {
  const { authenticated, me, loading, user } = useAuth();

  useEffect(() => {
    me();
  }, [me]);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );

  return (
    <Routes>
      {authenticated ? (
        <>
          {user.administrador ? (
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/tables/users" element={<Users />} />
            </Route>
          ) : (
            <>
              <Route index element={<Editor />} />
              <Route path="/:selectedPageId" element={<Editor />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="*" element={<Navigate to="/auth/sign-in" />} />
        </>
      )}
      <Route path="/verify-account/:token" element={<VerifyAccount />} />
      <Route path="/reset-password/:token" element={<PasswordRecovery />} />
    </Routes>
  );
}
