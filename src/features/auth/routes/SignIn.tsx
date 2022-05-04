import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';
import { useAuth } from '../stores/auth';
import { Credentials } from '../types';
import { Link } from 'react-router-dom';

export function SignIn() {
  const { signIn } = useAuth();

  const [credentials, setCredentials] = React.useState<Credentials>({
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const value = e.target.value;

    setCredentials({
      ...credentials,
      [key]: value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(credentials);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="max-w-xs rounded p-4 border-solid border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h1>
        <Input
          value={credentials.email}
          name="email"
          prefix={<MailOutlined className="mr-1" />}
          className="mb-4 w-full"
          placeholder="Correo electrónico"
          type="email"
          onChange={onChange}
          required
        />
        <Input.Password
          value={credentials.password}
          name="password"
          prefix={<LockOutlined className="mr-1" />}
          className="mb-6 w-full"
          placeholder="Contraseña"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={onChange}
          required
        />
        <Button className="mb-2" htmlType="submit" type="primary" block>
          Iniciar sesión
        </Button>
        <p className="mb-6 text-center">
          <Link className="text-xs" to="/auth/password-recovery" replace>
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
