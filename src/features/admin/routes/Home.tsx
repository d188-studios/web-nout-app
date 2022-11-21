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
      path: '',
    },
    {
      id: '2',
      title: 'Calificaciones de encuestas de usuarios verificados',
      path: '',
    },
    {
      id: '3',
      title: 'Informacion sobre usuarios baneados',
      path: '',
    },
  ];

  const tables: ItemType[] = [
    {
      id: '1',
      title: 'Usuarios',
      path: '/tables/users',
    },
    {
      id: '1',
      title: 'Movimientos de usuarios',
      path: '/tables/movimientos_de_usuarios',
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
