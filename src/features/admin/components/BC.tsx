import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

export interface BCProps {
  title: string;
}

export function BC({ title }: BCProps) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item>{title}</Breadcrumb.Item>
    </Breadcrumb>
  );
}
