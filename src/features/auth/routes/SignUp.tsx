import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Input } from 'antd';

export function SignUp() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-xs rounded p-4 border-solid border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6">Registrarse</h1>
        <Input
          name="email"
          prefix={<MailOutlined className="mr-1" />}
          className="mb-4 w-full"
          placeholder="Correo electrónico"
          type="email"
        />
        <Input
          name="username"
          prefix={<UserOutlined className="mr-1" />}
          className="mb-4 w-full"
          placeholder="Nombre de usuario"
        />
        <Input.Password
          name="password"
          prefix={<LockOutlined className="mr-1" />}
          className="mb-4 w-full"
          placeholder="Contraseña"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <Input.Password
          name="passwordConfirmation"
          prefix={<LockOutlined className="mr-1" />}
          className="mb-6 w-full"
          placeholder="Confirmar contraseña"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
        <Button type="primary" block>
          Registrarme
        </Button>
      </div>
    </div>
  );
}
