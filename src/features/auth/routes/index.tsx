import { Route, Routes } from 'react-router-dom';

import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
    </Routes>
  );
};