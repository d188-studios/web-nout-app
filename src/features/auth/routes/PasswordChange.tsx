import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';

export function PasswordChange() {
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
          Cambiar contraseña
        </h1>
        <Input.Password
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
          value={values.passwordConfirmation}
          name="passwordConfirmation"
          prefix={<LockOutlined className="mr-1" />}
          className="mb-6 w-full"
          placeholder="Confirmar contraseña"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={onChange}
          required
        />
        <Button htmlType="submit" type="primary" block>
          Cambiar contraseña
        </Button>
      </form>
    </div>
  );
}
