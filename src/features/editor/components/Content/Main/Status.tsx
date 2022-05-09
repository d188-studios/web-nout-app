import { PlusOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Empty, Result, Spin } from 'antd';
import { useEventEmitter } from '~/lib/eventemitter';

export interface StatusProps {
  loading: boolean;
  fetchError: Error | null;
  noPageSelected: boolean;
  noPageFound: boolean;
  onRefresh: () => void;
}

export function Status({
  loading,
  fetchError,
  noPageSelected,
  noPageFound,
  onRefresh,
}: StatusProps) {
  const { emit } = useEventEmitter();

  if (loading)
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-auto">
        <Spin size="large" />
      </div>
    );

  if (noPageSelected)
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-auto">
        <Empty
          description={
            <p className="mb-0 text-gray-500">
              Crea o selecciona una página para editar.
            </p>
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button
            onClick={() => {
              emit('openAddPageDialog');
            }}
            icon={<PlusOutlined />}
            type="primary"
          >
            Nueva página
          </Button>
        </Empty>
      </div>
    );

  if (noPageFound)
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-auto">
        <Result
          status="404"
          title="404"
          subTitle="No se encontró la página."
          extra={
            <Button
              onClick={() => {
                emit('openAddPageDialog');
              }}
              icon={<PlusOutlined />}
              type="primary"
            >
              Nueva página
            </Button>
          }
        />
      </div>
    );

  if (fetchError)
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-auto">
        <Result
          status="error"
          title="Ha ocurrido un error al cargar la página."
          subTitle="Por favor, inténtelo de nuevo más tarde."
          extra={[
            <Button
              key="new"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                emit('openAddPageDialog');
              }}
            >
              Nueva página
            </Button>,
            <Button onClick={onRefresh} key="reload" icon={<RedoOutlined />}>
              Intentar de nuevo
            </Button>,
          ]}
        />
      </div>
    );

  return null;
}
