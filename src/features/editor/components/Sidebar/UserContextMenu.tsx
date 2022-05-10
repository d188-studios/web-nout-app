import { CheckOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useAuth } from '~/features/auth';
import { useEventEmitter } from '~/lib/eventemitter';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Position } from '../../types';

export default function UserContextMenu() {
  const { user, signOut } = useAuth();
  const { addListener } = useEventEmitter();
  const [position, setPosition] = React.useState<Position | null>(null);

  const mobile = useIsMobile();

  const nameInitial =
    user && user.username && user.username.length > 0
      ? user.username[0].toUpperCase()
      : undefined;

  const itemClassName =
    'rounded flex items-center h-8 px-3 cursor-pointer select-none hover:bg-slate-200 transition-all';

  useEffect(() => {
    return addListener('openUserContextMenu', setPosition);
  }, [addListener]);

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

  if (position !== null)
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute bg-white shadow-md rounded w-80 top-14 left-4 z-[9999]"
        style={
          mobile
            ? {
                left: 0,
                right: 0,
                width: '100%',
              }
            : undefined
        }
      >
        <div
          className="
          border-0
          border-b
          border-solid
          border-gray-200
          p-4
          flex
          z-[9999]
        "
        >
          {nameInitial ? (
            <Avatar className="mr-2" size="large">
              {nameInitial}
            </Avatar>
          ) : null}
          <div>
            <p className="text-xs mb-0">
              <span>{user.username}</span>
              {user.authorized ? (
                <CheckOutlined
                  className="ml-1"
                  style={{
                    color: '#1890ff',
                  }}
                />
              ) : null}
            </p>
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
