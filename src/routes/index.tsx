import { Spin } from 'antd';
import { Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '~/features/auth';
import { Editor } from '~/features/editor';

const Layout = () => {
  return (
    <Suspense
      fallback={
        <div className="h-full flex items-center justify-center">
          <Spin size="large" />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Editor />} />
        <Route path="auth/*" element={<AuthRoutes />} />
      </Route>
    </Routes>
  );
}
