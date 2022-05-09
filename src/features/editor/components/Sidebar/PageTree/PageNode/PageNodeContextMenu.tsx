import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useIsMobile } from '~/features/editor/hooks/useIsMobile';
import { PageCopyProps, PageRenameProps, Position } from '~/features/editor/types';
import { useEventEmitter } from '~/lib/eventemitter';

export function PageNodeContextMenu() {
  const { addListener, emit } = useEventEmitter();

  const mobile = useIsMobile();
  const [page, setPage] = useState<PageRenameProps | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    return addListener<{
      page: PageRenameProps;
      position: Position;
    }>('openPageContextMenu', ({ page, position }) => {
      setPage(page);
      setPosition(position);
    });
  }, [addListener]);

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

  const itemClassName =
    'rounded flex items-center h-8 px-3 cursor-pointer select-none hover:bg-slate-200 transition-all';

  if (page !== null)
    return (
      <div
        className="absolute bg-white p-1 shadow-md rounded w-40 z-[9999]"
        style={mobile ? {
          top: position.y,
          left: 0,
          right: 0,
          width: '100%',
        } : {
          top: position.y,
          left: position.x,
        }}
      >
        <div
          className={itemClassName}
          onClick={(e) => {
            e.stopPropagation();

            emit<PageRenameProps>('openRenamePageDialog', page);

            setPage(null);
          }}
        >
          <EditOutlined className="mr-3" />
          <span>Renombrar</span>
        </div>
        <div
          className={itemClassName}
          onClick={(e) => {
            e.stopPropagation();

            emit<PageCopyProps>('openCopyPageDialog', page);

            setPage(null);
          }}
        >
          <CopyOutlined className="mr-3" />
          <span>Hacer una copia</span>
        </div>
        <div
          className={clsx(itemClassName, 'hover:bg-red-50')}
          onClick={(e) => {
            e.stopPropagation();

            emit<PageRenameProps>('openDeletePageDialog', page);

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
