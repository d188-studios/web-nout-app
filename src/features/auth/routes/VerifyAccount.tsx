import { Button, Result, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { webNout } from '~/lib/webNout';

export function VerifyAccount() {
  const { token = '' } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        setLoading(true);
        await webNout.post(`/auth/verify-account/${token}`);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e as Error);
      }
    };

    verifyAccount();
  }, [token]);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex justify-center items-center">
        <Result
          status="error"
          title="El enlace de verificación no es válido o ha expirado."
          extra={
            <Button
              onClick={() => {
                navigate('/', {
                  replace: true,
                });
              }}
              type="primary"
              key="console"
            >
              Ir al inicio
            </Button>
          }
        />
      </div>
    );

  return (
    <div className="h-screen flex justify-center items-center">
      <Result
        status="success"
        title="Tu cuenta ha sido verificada."
        extra={
          <Button
            onClick={() => {
              navigate('/', {
                replace: true,
              });
            }}
            type="primary"
            key="console"
          >
            Ir al inicio
          </Button>
        }
      />
    </div>
  );
}
