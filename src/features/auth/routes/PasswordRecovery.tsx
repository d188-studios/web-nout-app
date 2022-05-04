import {
  MailOutlined,
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export function PasswordRecovery() {
  const [email, setEmail] = React.useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          value={email}
          name="email"
          prefix={<MailOutlined className="mr-1" />}
          className="mb-4 w-full"
          placeholder="Correo electrónico"
          type="email"
          onChange={onChange}
          required
        />
        <Button className="mb-6" htmlType="submit" type="primary" block>
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
