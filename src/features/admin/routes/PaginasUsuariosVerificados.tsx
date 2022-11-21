import {
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
  nombre_de_usuario: React.Key;
  fecha_de_verificacion: string;
  numero_de_paginas: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Nombre de usuario',
    dataIndex: 'nombre_de_usuario',
  },
  {
    title: 'Numero de paginas',
    dataIndex: 'numero_de_paginas',
  },
  {
    title: 'Fecha de verificacion',
    dataIndex: 'fecha_de_verificacion',
    render: (_, row) => {
      return (
        <span>
          {format(new Date(row.fecha_de_verificacion), 'PP, hh:mm:ss a', {
            locale: es,
          })}
        </span>
      );
    },
  },
];

export const PaginasUsuariosVerificados: React.FC = () => {
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
        '/admin/view/paginas_usuarios_verificados',
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
          <BC title="Conteo de paginas de los usuarios verificados" />
        </div>
      </div>
      <Table
        rowKey={(row) => row.nombre_de_usuario}
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
