import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../stores/auth';
import { SignUpProps } from '../types';

export function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState<SignUpProps>({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
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

    setError(null);

    if (values.password.length < 6) {
      setError(new Error('La contraseña debe tener al menos 6 caracteres.'));
    } else if (values.password !== values.passwordConfirmation) {
      setError(new Error('Las contraseñas no coinciden.'));
    } else {
      setLoading(true);

      const either = await signUp(values);
      either.fold(
        (e) => setError(e),
        () => {
          setError(null);
          navigate('/', {
            replace: true,
          });
        }
      );

      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="max-w-xs rounded p-4 border-solid border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Registrarse</h1>
        <Input
          required
          name="email"
          onChange={onChange}
          prefix={<MailOutlined className="mr-1" />}
          className="mb-4 w-full"
          placeholder="Correo electrónico"
          type="email"
        />
        <Input
          required
          name="username"
          onChange={onChange}
          prefix={<UserOutlined className="mr-1" />}
          className="mb-4 w-full"
          placeholder="Nombre de usuario"
        />
        <Input.Password
          required
          name="password"
          onChange={onChange}
          prefix={<LockOutlined className="mr-1" />}
          className="mb-4 w-full"
          placeholder="Contraseña"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <Input.Password
          required
          name="passwordConfirmation"
          onChange={onChange}
          prefix={<LockOutlined className="mr-1" />}
          className="mb-3 w-full"
          placeholder="Confirmar contraseña"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        {error ? (
          <p className="mb-1 mt-1 text-center text-red-500">{error.message}</p>
        ) : null}
        <Button
          loading={loading}
          htmlType="submit"
          className="mb-6 mt-3"
          type="primary"
          block
        >
          Registrarme
        </Button>
        <p className="text-center">
          <span>¿Ya tienes una cuenta? </span>
          <Link to="/auth/sign-in" replace>
            Iniciar sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
