import { Navigate, Route, Routes } from 'react-router-dom';

import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { SendPasswordRecoveryEmail } from './SendPasswordRecoveryEmail';
import { Helmet } from 'react-helmet';
import { APP_NAME } from '~/config';

export function AuthRoutes() {
  return (
    <>
    <Helmet>
      <title>{APP_NAME}</title>
    </Helmet>
    <Routes>
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route
        path="send-reset-password"
        element={<SendPasswordRecoveryEmail />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </>
  );
}
