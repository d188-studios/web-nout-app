import { List, Typography } from 'antd';
import { Link } from 'react-router-dom';

type ItemType = {
  id: string;
  title: string;
  path: string;
};

export function Home() {
  const views: ItemType[] = [
    {
      id: '1',
      title: 'Conteo de paginas de los usuarios verificados',
      path: '/views/paginas_usuarios_verificados',
    },
    {
      id: '2',
      title: 'Calificaciones de encuestas de usuarios no verificados',
      path: '/views/calificaciones_usuarios_sin_verificar',
    },
    {
      id: '3',
      title: 'Informacion sobre usuarios baneados',
      path: '/views/usuarios_baneados',
    },
  ];

  const tables: ItemType[] = [
    {
      id: '1',
      title: 'Usuarios',
      path: '/tables/users',
    },
    {
      id: '2',
      title: 'Movimientos de usuarios',
      path: '/tables/movimientos_de_usuarios',
    },
    {
      id: '3',
      title: 'Movimientos de páginas',
      path: '/tables/movimientos_de_paginas',
    },
  ];

  return (
    <div className="p-8 pt-4">
      <List
        className="mb-4"
        dataSource={views}
        rowKey="id"
        header={
          <Typography.Title style={{ marginBottom: 0 }}>
            Vistas
          </Typography.Title>
        }
        renderItem={(item) => (
          <List.Item
            style={{
              height: 60,
            }}
          >
            <Typography.Text
              style={{
                fontSize: '1.2em',
              }}
            >
              <Link to={item.path}>{item.title}</Link>
            </Typography.Text>
          </List.Item>
        )}
      />

      <List
        dataSource={tables}
        rowKey="id"
        header={
          <Typography.Title style={{ marginBottom: 0 }}>
            Tablas
          </Typography.Title>
        }
        renderItem={(item) => (
          <List.Item
            style={{
              height: 60,
            }}
          >
            <Typography.Text
              style={{
                fontSize: '1.2em',
              }}
            >
              <Link to={item.path}>{item.title}</Link>
            </Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
}
