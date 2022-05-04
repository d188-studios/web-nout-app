import { Button } from 'antd';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { useSidebar } from '../../stores/sidebar';

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const { setVisible } = useSidebar();
  const username = 'John Doe';

  return (
    <div className="w-full flex px-4 items-center h-16">
      <p className="flex-1 mb-0">{username}</p>
      <Button
        className="bg-transparent border-0 shadow-none"
        onClick={() => {
          setVisible(false);
        }}
        icon={<DoubleLeftOutlined />}
      />
    </div>
  );
}
