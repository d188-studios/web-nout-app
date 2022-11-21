import { Avatar } from 'antd';
import { useAuth } from '~/features/auth';
import { useEventEmitter } from '~/lib/eventemitter';
import { Position } from '~/types';

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const { user } = useAuth();
  const { emit } = useEventEmitter();
  const nameInitial =
    user && user.username && user.username.length > 0
      ? user.username[0].toUpperCase()
      : undefined;

  return (
    <>
  
    <div className="w-full flex px-4 items-center h-16 bg-gray-100 fixed" style={{
      zIndex: 100
    }}>
      <div
        className='flex px-4'
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
        <p className="mb-0">{user.username}</p>
      </div>
    </div>
    <div className='h-16' />
    </>
  );
}
