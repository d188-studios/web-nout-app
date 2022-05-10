import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useAuth } from '../stores/auth';
import { SignInProps } from '../types';
import { Link } from 'react-router-dom';

export function SignIn() {
  const [form] = Form.useForm();
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
      <Form
        className="rounded p-4 border-solid border border-gray-200"
        style={{
          maxWidth: '350px',
          width: '100%',
        }}
        form={form}
        onFinish={onFinish}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h1>

        <Form.Item
          hasFeedback
          name="username"
          rules={[
            {
              required: true,
              message: 'El nombre de usuario es requerido.',
            },
            {
              max: 32,
              message:
                'El nombre de usuario no puede tener más de 32 caracteres.',
            },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message:
                'El nombre de usuario solo puede contener letras, números y guiones bajos.',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="mr-1" />}
            placeholder="Nombre de usuario"
          />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="password"
          rules={[
            {
              required: true,
              message: 'La contraseña es requerida.',
            },
            {
              min: 6,
              message: 'La contraseña debe tener al menos 6 caracteres.',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="mr-1" />}
            placeholder="Contraseña"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item className="mb-4">
          <Button loading={loading} htmlType="submit" type="primary" block>
            Iniciar sesión
          </Button>
        </Form.Item>

        {error ? (
          <p className="text-center text-red-500">{error.message}</p>
        ) : null}

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
      </Form>
    </div>
  );
}
