import {
  Button,
  Checkbox,
  Select,
  Table,
  TablePaginationConfig,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import React, { useCallback, useEffect, useState } from 'react';
import { webNout } from '~/lib/webNout';
import { TableParams } from '~/types';
import { BC } from '../components/BC';

interface DataType {
  id: React.Key;
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  baneado: boolean;
  verificado: boolean;
  encuesta_contestada: boolean;
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
    title: 'Verificado',
    dataIndex: 'verificado',
    width: 100,
    render: (_, row) => {
      return <Checkbox disabled checked={row.verificado} />;
    },
  },
  {
    title: 'Encuesta contestada',
    dataIndex: 'encuesta_contestada',
    width: 100,
    render: (_, row) => {
      return <Checkbox disabled checked={row.encuesta_contestada} />;
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
  const [usernames, setUsernames] = useState<string[]>();
  const [emails, setEmails] = useState<string[]>([]);
  const [baneado, setBaneado] = useState<boolean | undefined>();
  const [verificado, setVerificado] = useState<boolean | undefined>();
  const [contestada, setContestada] = useState<boolean | undefined>();


  const onChangeUsernames = useCallback((usernames: string[]) => {
    setUsernames(usernames);
    setTableParams((tableParams) => ({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    }));
  }, []);

  const onChangeEmails = useCallback((emails: string[]) => {
    setEmails(emails);
    setTableParams((tableParams) => ({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    }));
  }, []);

  const onChangeBaneado = useCallback((baneado: boolean | undefined) => {
    setBaneado(baneado);
    setTableParams((tableParams) => ({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    }));
  }, []);

  const onChangeVerificado = useCallback((verificado: boolean | undefined) => {
    setVerificado(verificado);
    setTableParams((tableParams) => ({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    }));
  }, []);

  const onChangeContestada = useCallback((contestada: boolean | undefined) => {
    setContestada(contestada);
    setTableParams((tableParams) => ({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    }));
  }, []);

  const getAll = useCallback(async () => {
    setLoading(true);

    try {
      const res = await webNout.post('/admin/users', {
        page: tableParams.pagination?.current,
        limit: tableParams.pagination?.pageSize,
        usernames,
        email: emails,
        baneado,
        contestada,
        verificado
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
  }, [JSON.stringify(tableParams), usernames, emails, baneado, contestada, verificado]);

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

  const [banning, setBanning] = useState(false);

  const banSelectedUsers = async () => {
    setBanning(true);

    try {
      await webNout.post('/admin/ban', rowSelection.selectedRowKeys);
      setSelectedRowKeys([]);
      getAll();
    } catch (e) {
      console.error(e);
    }

    setBanning(false);
  };

  return (
    <div className="p-8 pt-4">
      <div className="flex items-center mb-4 h-8">
        <div className="flex-1">
          <BC title="Usuarios" />
        </div>
        {hasSelected ? (
          <Button loading={banning} onClick={banSelectedUsers} danger>
            Toggle Baneo
          </Button>
        ) : null}
      </div>
      <div className="flex mb-6">
        <div className="flex flex-col flex-1 mr-4">
          <div className="flex flex-col mb-4">
            <Typography.Text className="mb-2">Baneado</Typography.Text>
            <Select
              className="flex-1"
              placeholder="Filtrar por baneado"
              allowClear
              value={baneado}
              onChange={onChangeBaneado}
              options={[
                {
                  value: true,
                  label: 'Baneado',
                },
                {
                  value: false,
                  label: 'No baneado',
                },
              ]}
            />
          </div>
          <div className="flex flex-col mb-4">
            <Typography.Text className="mb-2">Verificado</Typography.Text>
            <Select
              className="flex-1"
              placeholder="Filtrar por veridicado"
              allowClear
              value={verificado}
              onChange={onChangeVerificado}
              options={[
                {
                  value: true,
                  label: 'Verificado',
                },
                {
                  value: false,
                  label: 'No verificado',
                },
              ]}
            />
          </div>
          <div className="flex flex-col">
            <Typography.Text className="mb-2">
              Encuesta contestada
            </Typography.Text>
            <Select
              className="flex-1"
              placeholder="Filtrar por encuesta contestada"
              allowClear
              value={contestada}
              onChange={onChangeContestada}
              options={[
                {
                  value: true,
                  label: 'Contestada',
                },
                {
                  value: false,
                  label: 'No contestada',
                },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col mb-4">
            <Typography.Text className="mb-2">
              Nombres de usuario
            </Typography.Text>
            <Select
              className="flex-1"
              mode="tags"
              placeholder="Filtrar por nombres de usuario"
              allowClear
              value={usernames}
              onChange={onChangeUsernames}
            />
          </div>
          <div className="flex flex-col">
            <Typography.Text className="mb-2">
              Correos electronicos
            </Typography.Text>
            <Select
              className="flex-1"
              mode="tags"
              placeholder="Filtrar por correos electronicos"
              allowClear
              value={emails}
              onChange={onChangeEmails}
            />
          </div>
        </div>
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
          y: 500,
        }}
      />
    </div>
  );
};
