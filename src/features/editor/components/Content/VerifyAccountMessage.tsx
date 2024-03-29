import { Alert, Button, Space } from 'antd';
import React from 'react';
import toast from 'react-hot-toast';
import { webNout } from '~/lib/webNout';

export interface VerifyAccountMessageProps {
  authorized: boolean;
}

export function VerifyAccountMessage({
  authorized,
}: VerifyAccountMessageProps) {
  const [loading, setLoading] = React.useState(false);

  const onClick = async () => {
    setLoading(true);

    try {
      await webNout.post('/auth/send-verify-account-email');

      toast.success('Te enviamos un correo para recuperar tu cuenta.', {
        position: 'top-center',
      });
    } catch (e) {
      toast.error(
        'Ha ocurrido un error al enviar el correo de verificación. Por favor, inténtalo de nuevo más tarde.',
        {
          position: 'top-center',
        }
      );
    }

    setLoading(false);
  };

  if (authorized) return null;

  return (
    <Alert
      className="border-0"
      message="Tu cuenta no está verificada. Por favor, verifica tu cuenta."
      type="warning"
      action={
        <Space>
          <Button loading={loading} onClick={onClick} size="small" type="ghost">
            Verificar
          </Button>
        </Space>
      }
    />
  );
}
