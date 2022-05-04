import { Avatar, Button } from 'antd';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { useSidebar } from '../../stores/sidebar';
import { useAuth } from '~/features/auth';

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const { user, signOut } = useAuth();
  const { setVisible } = useSidebar();

  const nameInitial =
    user.name.length > 0 ? user.name[0].toUpperCase() : undefined;

  return (
    <div
      className="w-full flex px-4 items-center h-16"
      onClick={() => {
        signOut();
      }}
    >
      {nameInitial ? (
        <Avatar size="small" className="mr-2">
          {nameInitial}
        </Avatar>
      ) : null}
      <p className="flex-1 mb-0">{user.name}</p>
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
