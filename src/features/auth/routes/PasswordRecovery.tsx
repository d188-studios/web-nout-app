import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axios } from '~/lib/axios';

export function PasswordRecovery() {
  const { token = '' } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [values, setValues] = React.useState({
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

    if (values.password !== values.passwordConfirmation) {
      setError(new Error('Las contraseñas no coinciden.'));
      return;
    }

    setLoading(true);

    try {
      await axios.post(`/auth/reset-password/${token}`, values);
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
      <form
        onSubmit={onSubmit}
        className="max-w-xs rounded p-4 border-solid border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Cambiar contraseña
        </h1>
        <Input.Password
          disabled={loading}
          value={values.password}
          name="password"
          prefix={<LockOutlined className="mr-1" />}
          className="mb-4 w-full"
          placeholder="Contraseña"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={onChange}
          required
        />
        <Input.Password
          disabled={loading}
          value={values.passwordConfirmation}
          name="passwordConfirmation"
          prefix={<LockOutlined className="mr-1" />}
          className="mb-2 w-full"
          placeholder="Confirmar contraseña"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={onChange}
          required
        />
        {error ? (
          <p className="mb-1 mt-1 text-center text-red-500">{error.message}</p>
        ) : null}
        <Button
          className="mt-2"
          loading={loading}
          htmlType="submit"
          type="primary"
          block
        >
          Cambiar contraseña
        </Button>
      </form>
    </div>
  );
}
