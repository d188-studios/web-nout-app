import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../stores/auth';
import { SignUpProps } from '../types';
import toast from 'react-hot-toast';
import { ErrorMessages } from '../components/ErrorMessages';

export function SignUp() {
  const [form] = Form.useForm();
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: SignUpProps) => {
    setLoading(true);

    const either = await signUp(values);
    either.fold(
      (e) => setError(e),
      () => {
        toast.success('Te enviamos un correo para confirmar tu cuenta.');
        setError(null);
        navigate('/', {
          replace: true,
        });
      }
    );

    setLoading(false);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Form
        onFinish={onFinish}
        form={form}
        className="rounded p-4 border-solid border border-gray-200"
        style={{
          maxWidth: '350px',
          width: '100%',
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Registrarse</h1>

        <Form.Item
          hasFeedback
          name="email"
          rules={[
            {
              type: 'email',
              message: 'El correo electrónico no es válido.',
            },
            {
              required: true,
              message: 'El correo electrónico es requerido.',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="mr-1" />}
            placeholder="Correo electrónico"
            type="email"
          />
        </Form.Item>

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

        <Form.Item
          name="passwordConfirmation"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'La confirmación de contraseña es requerida.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Las contraseñas no coinciden.')
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="mr-1" />}
            placeholder="Confirmar contraseña"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item className="mb-5">
          <Button loading={loading} htmlType="submit" type="primary" block>
            Registrarme
          </Button>
        </Form.Item>

        <ErrorMessages error={error} />
        {/* {error ? (
          <p className="text-center text-red-500">{error.message}</p>
        ) : null} */}

        <p className="text-center mt-5">
          <span>¿Ya tienes una cuenta? </span>
          <Link to="/auth/sign-in" replace>
            Iniciar sesión
          </Link>
        </p>
      </Form>
    </div>
  );
}
