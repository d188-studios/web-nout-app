import {
  Checkbox,
  Table,
  TablePaginationConfig,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import React, { useCallback, useEffect, useState } from 'react';
import { webNout } from '~/lib/webNout';
import { TableParams } from '~/types';
import { BC } from '../components/BC';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


interface DataType {
  id: React.Key;
  nombre_de_usuario: string;
  fecha_de_baneo: string;
  estado_encuesta: boolean;
  estado_verificacion: boolean;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Nombre de usuario',
    dataIndex: 'nombre_de_usuario',
  },
  {
    title: 'Estado de encuesta',
    dataIndex: 'estado_encuesta',
    render: (_, row) => {
      return <Checkbox disabled checked={row.estado_encuesta} />;
    },
  },
  {
    title: 'Estado de verificacion',
    dataIndex: 'estado_verificacion',
    render: (_, row) => {
      return <Checkbox disabled checked={row.estado_verificacion} />;
    },
  },
  {
    title: 'Fecha de baneo',
    dataIndex: 'fecha_de_baneo',
    render: (_, row) => {
      return (
        <span>
          {format(new Date(row.fecha_de_baneo), 'PP, hh:mm:ss a', {
            locale: es,
          })}
        </span>
      );
    },
  },
];

export const UsuariosBaneados: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
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
        '/admin/view/baneados',
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

  return (
    <div className="p-8 pt-4">
      <div className="flex items-center mb-4 h-8">
        <div className="flex-1">
          <BC title="Informacion sobre usuarios baneados" />
        </div>
      </div>
      <Table
        rowKey={(row) => row.id}
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        size="small"
        scroll={{
          y: 700,
        }}
      />
    </div>
  );
};
