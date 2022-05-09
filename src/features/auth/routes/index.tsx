import { Navigate, Route, Routes } from 'react-router-dom';

import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { SendPasswordRecoveryEmail } from './SendPasswordRecoveryEmail';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route
        path="send-reset-password"
        element={<SendPasswordRecoveryEmail />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
