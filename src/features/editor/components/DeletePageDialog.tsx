import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useEventEmitter } from '~/lib/eventemitter';
import { Page } from '../types';

export function DeletePageDialog() {
  const { addListener, emit } = useEventEmitter();
  const [page, setPage] = React.useState<Page | null>(null);

  const onClose = () => {
    setPage(null);
  };

  const onDelete = () => {
    if (!page) return;

    emit('deletePage', page);

    onClose();
  };

  useEffect(() => {
    return addListener('openDeletePageDialog', (page) => {
      setPage(page);
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
        <p className="mb-4">
          ¿Estás seguro de que quieres eliminar la página{' '}
          <strong>{page.title}</strong>?
        </p>
        <div className="flex">
          <Button className="flex-1 mr-1" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            danger
            className="flex-1 ml-1"
            type="primary"
            onClick={onDelete}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}
