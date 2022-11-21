import { MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { webNout } from '~/lib/webNout';
import toast from 'react-hot-toast';

export function SendPasswordRecoveryEmail() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const onFinish = async (values: { email: string }) => {
    setLoading(true);

    try {
      await webNout.post(`/auth/reset-password`, values);

      toast.success('Te enviamos un correo para recuperar tu cuenta.');
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
      <Form
        onFinish={onFinish}
        className="rounded p-4 border-solid border border-gray-200"
        style={{
          maxWidth: '350px',
          width: '100%',
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Recuperar cuenta
        </h1>

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
            disabled={loading}
            prefix={<MailOutlined className="mr-1" />}
            placeholder="Correo electrónico"
            type="email"
          />
        </Form.Item>

        <Form.Item className="mb-5">
          <Button loading={loading} htmlType="submit" type="primary" block>
            Enviar correo de recuperación
          </Button>
        </Form.Item>

        {error ? (
          <p className="text-center text-red-500">{error.message}</p>
        ) : null}

        <p className="mb-0 text-center">
          <Link to="/auth/sign-in" replace>
            Regresar a inicio de sesión
          </Link>
        </p>
      </Form>
    </div>
  );
}
