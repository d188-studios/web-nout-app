import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';
import { useAuth } from '../stores/auth';
import { SignInProps } from '../types';
import { Link } from 'react-router-dom';

export function SignIn() {
  const { signIn } = useAuth();

  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState<SignInProps>({
    username: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const value = e.target.value;

    setValues({
      ...values,
      [key]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      <form
        onSubmit={onSubmit}
        className="max-w-xs rounded p-4 border-solid border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h1>
        <Input
          value={values.username}
          name="username"
          prefix={<UserOutlined className="mr-1" />}
          className="mb-4 w-full"
          placeholder="Nombre de usuario"
          onChange={onChange}
          required
        />
        <Input.Password
          value={values.password}
          name="password"
          prefix={<LockOutlined className="mr-1" />}
          className="mb-3 w-full"
          placeholder="Contraseña"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={onChange}
          required
        />
        {error ? (
          <p className="mb-1 mt-1 text-center text-red-500">
            {error.message}
          </p>
        ) : null}
        <Button
          loading={loading}
          className="mb-2 mt-3"
          htmlType="submit"
          type="primary"
          block
        >
          Iniciar sesión
        </Button>
        <p className="mb-6 text-center">
          <Link className="text-xs" to="/auth/send-reset-password" replace>
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
        <p className="text-center">
          <span>¿No tienes una cuenta? </span>
          <Link to="/auth/sign-up" replace>
            Registrate
          </Link>
        </p>
      </form>
    </div>
  );
}
