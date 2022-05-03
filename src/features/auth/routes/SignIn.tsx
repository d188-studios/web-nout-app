import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Button, Input } from 'antd';

export function SignIn() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-xs rounded p-4 border-solid border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h1>
        <Input
          name="email"
          prefix={<MailOutlined className="mr-1" />}
          className="mb-4 w-full"
          placeholder="Correo electrónico"
          type="email"
        />
        <Input.Password
          name="password"
          prefix={<LockOutlined className="mr-1" />}
          className="mb-6 w-full"
          placeholder="Contraseña"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <Button type="primary" block>
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
}
