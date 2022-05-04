import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useEditor } from '~/features/editor/stores/editor';
import { Page } from '~/features/editor/types';

export function PageNodeContextMenu() {
  const { addOpenPageContextMenuListener, deletePage, updatePage } =
    useEditor();

  const [page, setPage] = useState<Page | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onPressOutside = () => {
      setPage(null);
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
    return addOpenPageContextMenuListener((page, position) => {
      setPage(page);
      setPosition(position);
    });
  }, [addOpenPageContextMenuListener]);

  const itemClassName =
    'rounded flex items-center h-8 px-3 cursor-pointer select-none hover:bg-slate-200 transition-all';

  if (page !== null)
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

            const newTitle = prompt(
              'Escribe el nuevo título de la página título',
              page.title
            );

            updatePage(page, {
              title: newTitle !== null ? newTitle : page.title,
            });

            setPage(null);
          }}
        >
          <EditOutlined className="mr-3" />
          <span>Renombrar</span>
        </div>
        <div
          className={clsx(itemClassName, 'hover:bg-red-50')}
          onClick={(e) => {
            e.stopPropagation();

            deletePage(page);
            setPage(null);
          }}
        >
          <DeleteOutlined className="mr-3 text-red-900" />
          <span className="text-red-900">Eliminar</span>
        </div>
      </div>
    );

  return null;
}
