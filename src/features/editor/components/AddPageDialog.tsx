import { Button, Input } from 'antd';
import React, { useEffect } from 'react';
import { useEventEmitter } from '~/lib/eventemitter';
import { Page } from '../types';

export function AddPageDialog() {
  const { addListener, emit } = useEventEmitter();
  const [page, setPage] = React.useState<Page | null>(null);
  const parentRef = React.useRef<Page | null>(null);
  const [title, setTitle] = React.useState('');

  const onClose = () => {
    setPage(null);
    setTitle('');
  };

  const onSave = () => {
    if (!page) return;

    emit('addPage', {
      page: parentRef.current,
      newPage: {
        ...page,
        title,
      },
    });

    onClose();
  };

  useEffect(() => {
    return addListener<{
      parent?: Page;
      page: Page;
    }>('openAddPageDialog', ({ parent, page }) => {
      parentRef.current = parent !== undefined ? parent : null;
      setPage(page);
      setTitle(page.title);
    });
  }, [addListener]);

  if (page === null) return null;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded p-4 w-80 flex flex-col"
      >
        <p className="mb-2">Escribe el nuevo título de la página:</p>
        <Input
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSave();
          }}
          autoFocus
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="w-full mb-4"
          placeholder="Título de la página"
        />
        <div className="flex">
          <Button danger className="flex-1 mr-1" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="flex-1 ml-1" type="primary" onClick={onSave}>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}
