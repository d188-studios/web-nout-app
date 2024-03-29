import {
  Select,
  Table,
  TablePaginationConfig,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import axios from 'axios';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { webNout } from '~/lib/webNout';
import { TableParams } from '~/types';
import { BC } from '../components/BC';

interface DataType {
  id: React.Key;
  id_usuario: string;
  username: string;
  movimiento: string;
  fecha_de_movimiento: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'ID Usuario',
    dataIndex: 'id_usuario',
  },
  {
    title: 'Nombre de usuario',
    dataIndex: 'username',
  },
  {
    title: 'Movimiento',
    dataIndex: 'movimiento',
    filters: [
      {
        text: 'CREADA',
        value: 'CREADA',
      },
      {
        text: 'ELIMINADA',
        value: 'ELIMINADA',
      },
      {
        text: 'TITULO-EDITADO',
        value: 'TITULO-EDITADO',
      },
    ],
    render: (_, row) => {
      let color = 'blue';

      switch (row.movimiento) {
        case 'ELIMINADA':
          color = 'red';
          break;
        case 'CREADA':
          color = 'green';
          break;
      }

      return <Tag color={color}>{row.movimiento}</Tag>;
    },
  },
  {
    title: 'Fecha de movimiento',
    dataIndex: 'movement_date',
    render: (_, row) => {
      return (
        <span>
          {format(new Date(row.fecha_de_movimiento), 'PP, hh:mm:ss a', {
            locale: es,
          })}
        </span>
      );
    },
  },
];

export const MovimientoDePaginas: React.FC = () => {
  const abortCtrl = useRef<AbortController | null>(null);
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 100,
    },
  });

  const [usernames, setUsernames] = useState<string[]>([]);

  const onChangeUsernames = useCallback((usernames: string[]) => {
    setUsernames(usernames);
    setTableParams(tableParams => ({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1
      }
    }))
  }, []);

  const getAll = useCallback(async () => {
    try {
      setLoading(true);

      if (abortCtrl.current) abortCtrl.current.abort();
      abortCtrl.current = new AbortController();

      const res = await webNout.post(
        '/admin/movimientos_pagina',
        {
          page: tableParams.pagination?.current,
          limit: tableParams.pagination?.pageSize,
          movimiento: tableParams.filters?.movimiento,
          usernames,
        },
        {
          signal: abortCtrl.current.signal,
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

      setLoading(false);
    } catch (e) {
      console.error(e);

      if (!axios.isCancel(e))
        setLoading(true);
    }
  }, [JSON.stringify(tableParams), usernames]);

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
      <div className="flex flex-row items-center mb-6 h-8">
        <div className="flex-1">
          <BC title="Movimientos de páginas" />
        </div>
      </div>
      <div className="flex flex-row mb-6">
        <Select
          className="flex-1"
          mode="tags"
          value={usernames}
          onChange={onChangeUsernames}
          placeholder="Filtrar por nombres de usuario"
          allowClear
        />
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
          y: 600,
        }}
      />
    </div>
  );
};
