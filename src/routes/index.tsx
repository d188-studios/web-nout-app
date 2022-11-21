import { Spin } from 'antd';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CalificacionesUsuariosSinVerificar, Home, Layout, MovimientoDePaginas, MovimientoDeUsuarios, PaginasUsuariosVerificados, Users, UsuariosBaneados } from '~/features/admin';
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
              <Route path="/tables/movimientos_de_usuarios" element={<MovimientoDeUsuarios />} />
              <Route path="/tables/movimientos_de_paginas" element={<MovimientoDePaginas />} />
              <Route path="/views/calificaciones_usuarios_sin_verificar" element={<CalificacionesUsuariosSinVerificar />} />
              <Route path="/views/paginas_usuarios_verificados" element={<PaginasUsuariosVerificados />} />
              <Route path="/views/usuarios_baneados" element={<UsuariosBaneados />} />
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
