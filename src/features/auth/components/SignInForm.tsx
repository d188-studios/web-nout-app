import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { SignInProps } from '../types';

export interface SignInFormProps {
  onFinish: (values: SignInProps) => void;
  error: Error | null;
  loading: boolean;
}

export function SignInForm({ onFinish, error, loading }: SignInFormProps) {
  const [form] = Form.useForm();

  return (
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
  );
}
