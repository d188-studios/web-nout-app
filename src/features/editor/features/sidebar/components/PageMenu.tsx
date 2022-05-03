import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useEffect } from 'react';
import { Page } from '../types';

export interface PageMenuProps {
  page: Page;
  position: {
    x: number;
    y: number;
  };
  onPressDelete?: (page: Page) => void;
  onPressEdit?: (page: Page) => void;
  onPressOutside?: () => void;
  menuRef?: React.Ref<HTMLDivElement>;
}

export function PageMenu({
  page,
  position,
  onPressDelete,
  onPressEdit,
  onPressOutside,
}: PageMenuProps) {
  useEffect(() => {
    if (onPressOutside) {
      document.addEventListener('click', onPressOutside);
      document.addEventListener('contextmenu', onPressOutside);

      return () => {
        document.removeEventListener('click', onPressOutside);
        document.removeEventListener('contextmenu', onPressOutside);
      };
    }
  }, [onPressOutside]);

  const itemClassName =
    'rounded flex items-center h-8 px-3 cursor-pointer select-none hover:bg-slate-200 transition-all';

  return (
    <div
      className="absolute bg-white p-1 shadow-md rounded w-40"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <div
        className={itemClassName}
        onClick={(e) => {
          e.stopPropagation();
          onPressEdit?.(page);
        }}
      >
        <EditOutlined className="mr-3" />
        <span>Renombrar</span>
      </div>
      <div
        className={clsx(itemClassName, 'hover:bg-red-50')}
        onClick={(e) => {
          e.stopPropagation();
          onPressDelete?.(page);
        }}
      >
        <DeleteOutlined className="mr-3 text-red-900" />
        <span className="text-red-900">Eliminar</span>
      </div>
    </div>
  );
}
