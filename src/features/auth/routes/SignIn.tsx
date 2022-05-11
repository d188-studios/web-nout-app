import React from 'react';
import { useAuth } from '../stores/auth';
import { SignInProps } from '../types';
import { SignInForm } from '../components/SignInForm';

export function SignIn() {
  const { signIn } = useAuth();

  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: SignInProps) => {
    setLoading(true);

    const either = await signIn(values);
    either.fold(
      (e) => setError(e),
      () => {
        setError(null);
      }
    );

    setLoading(false);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <SignInForm
        onFinish={onFinish}
        error={error}
        loading={loading}
        />
    </div>
  );
}
