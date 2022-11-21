import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { webNout } from '~/lib/webNout';
import toast from 'react-hot-toast';

export function PasswordRecovery() {
  const { token = '' } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const onFinish = async (values: {
    password: string;
    passwordConfirmation: string;
  }) => {
    setLoading(true);

    try {
      await webNout.post(`/auth/reset-password/${token}`, values);

      toast.success('El cambio de contraseña se ha realizado correctamente.');
      setError(null);
      navigate('/', {
        replace: true,
      });
    } catch (e) {
      setError(
        new Error(
          'No se pudo cambiar la contraseña. Por favor, intente nuevamente.'
        )
      );
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Form
        onFinish={onFinish}
        className="rounded p-4 border-solid border border-gray-200"
        style={{
          maxWidth: '350px',
          width: '100%',
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Cambiar contraseña
        </h1>

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
            disabled={loading}
            prefix={<LockOutlined className="mr-1" />}
            placeholder="Contraseña"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="passwordConfirmation"
          dependencies={['password']}
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
            disabled={loading}
            prefix={<LockOutlined className="mr-1" />}
            placeholder="Confirmar contraseña"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item className="mb-5">
          <Button loading={loading} htmlType="submit" type="primary" block>
            Cambiar contraseña
          </Button>
        </Form.Item>

        {error ? (
          <p className="text-center text-red-500">{error.message}</p>
        ) : null}
      </Form>
    </div>
  );
}
