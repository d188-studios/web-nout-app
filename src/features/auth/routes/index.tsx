import { Navigate, Route, Routes } from 'react-router-dom';

import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { PasswordRecovery } from './PasswordRecovery';
import { PasswordChange } from './PasswordChange';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="password-recovery" element={<PasswordRecovery />} />
      <Route path="change-password" element={<PasswordChange />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
