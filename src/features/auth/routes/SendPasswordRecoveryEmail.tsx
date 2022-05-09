import { MailOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axios } from '~/lib/axios';

export function SendPasswordRecoveryEmail() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState<Error | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(`/auth/reset-password`, { email });
      setError(null);
      navigate('/', {
        replace: true,
      });
    } catch (e) {
      setError(
        new Error('No se pudo enviar el correo. Por favor, intente nuevamente.')
      );
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="max-w-xs rounded p-4 border-solid border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Recuperar contraseña
        </h1>
        <Input
          disabled={loading}
          value={email}
          name="email"
          prefix={<MailOutlined className="mr-1" />}
          className="mb-2 w-full"
          placeholder="Correo electrónico"
          type="email"
          onChange={onChange}
          required
        />
        {error ? (
          <p className="mb-1 mt-1 text-center text-red-500">{error.message}</p>
        ) : null}
        <Button
          loading={loading}
          className="mt-2 mb-6"
          htmlType="submit"
          type="primary"
          block
        >
          Enviar correo de recuperación
        </Button>
        <p className="mb-0 text-center">
          <Link to="/auth/sign-in" replace>
            Regresar a inicio de sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
