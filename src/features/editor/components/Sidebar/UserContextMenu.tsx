import { LogoutOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useAuth } from '~/features/auth';
import { useSidebar } from '../../stores/sidebar';
import { Position } from '../../types';

export default function UserContextMenu() {
  const { user, signOut } = useAuth();
  const { addOpenUserContextMenuListener } = useSidebar();
  const [position, setPosition] = React.useState<Position | null>(null);

  const nameInitial =
    user.username.length > 0 ? user.username[0].toUpperCase() : undefined;

  const itemClassName =
    'rounded flex items-center h-8 px-3 cursor-pointer select-none hover:bg-slate-200 transition-all';

  useEffect(() => {
    const onPressOutside = () => {
      setPosition(null);
    };

    if (onPressOutside) {
      document.addEventListener('click', onPressOutside);
      document.addEventListener('contextmenu', onPressOutside);

      return () => {
        document.removeEventListener('click', onPressOutside);
        document.removeEventListener('contextmenu', onPressOutside);
      };
    }
  }, []);

  useEffect(() => {
    return addOpenUserContextMenuListener(setPosition);
  }, [addOpenUserContextMenuListener]);

  if (position !== null)
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute bg-white shadow-md rounded w-80 top-14 left-4"
      >
        <div
          className="
          border-0
          border-b
          border-solid
          border-gray-200
          p-4
          flex
        "
        >
          {nameInitial ? (
            <Avatar className="mr-2" size="large">
              {nameInitial}
            </Avatar>
          ) : null}
          <div>
            <p className="text-xs mb-0">{user.username}</p>
            <p className="text-xs mb-0 text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="p-1">
          <div
            className={clsx(itemClassName, 'hover:bg-red-50')}
            onClick={() => {
              signOut();
              setPosition(null);
            }}
          >
            <LogoutOutlined className="mr-3 text-red-900" />
            <span className="text-red-900">Cerrar sesión</span>
          </div>
        </div>
      </div>
    );

  return null;
}