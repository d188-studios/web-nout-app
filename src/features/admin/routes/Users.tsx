import {
  Button,
  Checkbox,
  Table,
  TablePaginationConfig,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import React, { useCallback, useEffect, useState } from 'react';
import { axios } from '~/lib/axios';
import { TableParams } from '~/types';
import { BC } from '../components/BC';

interface DataType {
  id: React.Key;
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  baneado: boolean;
  created_at: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Nombre de usuario',
    dataIndex: 'username',
  },
  {
    title: 'Correo electronico',
    dataIndex: 'email',
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
    title: 'Baneado',
    dataIndex: 'baneado',
    width: 100,
    render: (_, row) => {
      return <Checkbox disabled checked={row.baneado} />;
    },
  },
  {
    title: 'Fecha de creación',
    dataIndex: 'created_at',
    render: (_, row) => {
      return (
        <span>
          {format(new Date(row.created_at), 'PP, hh:mm:ss a', {
            locale: es,
          })}
        </span>
      );
    },
  },
];

export const Users: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const getUsers = useCallback(async () => {
    setLoading(true);

    try {
      const res = await axios.post('/admin/users', {
        page: tableParams.pagination?.current,
        limit: tableParams.pagination?.pageSize,
      });

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
    getUsers();
  }, [getUsers]);

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

  const [banning, setBanning] = useState(false);

  const banSelectedUsers = async () => {
    setBanning(true);

    try {
      await axios.post('/admin/ban', rowSelection.selectedRowKeys);
      getUsers();
    } catch (e) {
      console.error(e);
    }

    setBanning(false);
  };

  return (
    <div className="p-8 pt-4">
      <div className="flex flex-row items-center mb-6 h-8">
        <div className="flex-1">
          <BC title="Usuarios"/>
        </div>
        {hasSelected ? (
          <Button loading={banning} onClick={banSelectedUsers} danger>
            Toggle Baneo
          </Button>
        ) : null}
      </div>
      <Table
        rowKey={(row) => row.id}
        loading={loading || banning}
        rowSelection={rowSelection}
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
