import { Avatar, Button } from 'antd';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { useAuth } from '~/features/auth';
import { useEventEmitter } from '~/lib/eventemitter';
import { Position } from '../../types';

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const { user } = useAuth();
  const { emit } = useEventEmitter();
  const nameInitial =
    user.username.length > 0 ? user.username[0].toUpperCase() : undefined;

  return (
    <div
      className="w-full flex px-4 items-center h-16"
      onClick={(e) => {
        e.stopPropagation();
        emit<Position>('openUserContextMenu', {
          x: e.pageX,
          y: e.pageY,
        });
      }}
    >
      {nameInitial ? (
        <Avatar size="small" className="mr-2">
          {nameInitial}
        </Avatar>
      ) : null}
      <p className="flex-1 mb-0">{user.username}</p>
      <Button
        className="bg-transparent border-0 shadow-none"
        onClick={(e) => {
          e.stopPropagation();
          emit('closeSidebar');
        }}
        icon={<DoubleLeftOutlined />}
      />
    </div>
  );
}
