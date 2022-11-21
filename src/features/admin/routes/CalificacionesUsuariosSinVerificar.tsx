import {
  Button,
  Modal,
  Table,
  TablePaginationConfig,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import React, { useCallback, useEffect, useState } from 'react';
import { webNout } from '~/lib/webNout';
import { TableParams } from '~/types';
import { BC } from '../components/BC';
import interpolate from 'color-interpolate';

const interpolateColor = interpolate(['red', '#d1c936', 'green']);

interface DataType {
  nombre: string;
  apellido: string;
  username: React.Key;
  resultado_calificacion: string;
  promedio_calificacion: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Nombre de usuario',
    dataIndex: 'username',
  },
  {
    title: 'Nombre',
    dataIndex: 'nombre',
  },
  {
    title: 'Apellido',
    dataIndex: 'apellido',
  },
  {
    title: 'Profesion',
    dataIndex: 'profesion',
  },
  {
    title: 'Promedio calificación',
    dataIndex: 'promedio_calificacion',
    render: (_, row) => {
      return (
        <span
          style={{
            color: interpolateColor(row.promedio_calificacion / 5),
          }}
        >
          {row.promedio_calificacion}
        </span>
      );
    },
  },
  {
    title: 'Resultado calificación',
    dataIndex: 'resultado_calificacion',
    render: (_, row) => {
      return (
        <Tag color={interpolateColor(row.promedio_calificacion / 5)}>
          {row.resultado_calificacion}
        </Tag>
      );
    },
  },
];

export const CalificacionesUsuariosSinVerificar: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [result, setResult] = useState<{
    promedio: number;
    calificacion: string;
  }>({
    promedio: 0,
    calificacion: 'REPROBADO',
  });
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 100,
    },
  });

  const getAll = useCallback(async () => {
    setLoading(true);

    try {
      const res = await webNout.post(
        '/admin/view/calificaciones_usuarios_sin_verificar',
        {
          page: tableParams.pagination?.current,
          limit: tableParams.pagination?.pageSize,
        }
      );

      setData(res.data.users);

      setTableParams((tableParams) => ({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res.data.count,
        },
      }));
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }, [JSON.stringify(tableParams)]);

  useEffect(() => {
    getAll();
  }, [getAll]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<DataType>[]
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const [visible, setVisible] = useState(false);
  const [calculating, setCalculating] = useState(false);

  const onPressCalculate = async () => {
    setCalculating(true);

    try {
      const scores = selectedRowKeys.reduce((scores, username) => {
        const found = data.find((e) => e.username === username);
        if (found) return scores.concat(found.promedio_calificacion);
        return scores;
      }, [] as number[]);

      const res = await webNout.post('/admin/promedio', scores);
      setResult(res.data);
      setVisible(true);
    } catch (e) {
      console.error(e);
    }

    setCalculating(false);
  };

  return (
    <div className="p-8 pt-4">
      <div className="flex items-center mb-4 h-8">
        <div className="flex-1">
          <BC title="Calificaciones de encuestas de usuarios no verificados" />
        </div>
        <Button
          disabled={!hasSelected}
          type="primary"
          loading={calculating}
          onClick={onPressCalculate}
        >
          Calcular promedio
        </Button>
      </div>
      <Table
        rowKey={(row) => row.username}
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        size="small"
        scroll={{
          y: 700,
        }}
      />
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              height: 180,
              width: 180,
              borderRadius: 60,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: interpolateColor(result.promedio / 5),
              marginBottom: 20,
            }}
          >
            <Typography.Text
              style={{ color: 'white', fontSize: 80, fontWeight: 'bold' }}
            >
              {result.promedio.toFixed(1)}
            </Typography.Text>
          </div>
          <Typography.Title
            style={{
              marginBottom: 0,
            }}
          >
            {result.calificacion}
          </Typography.Title>
        </div>
      </Modal>
    </div>
  );
};
