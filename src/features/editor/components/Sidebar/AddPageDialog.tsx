import { Button, Input } from 'antd';
import React, { useEffect } from 'react';
import { useEventEmitter } from '~/lib/eventemitter';
import { usePages } from '../../stores/pages';
import { PageCreateProps } from '../../types';

export function AddPageDialog() {
  const { addListener } = useEventEmitter();
  const { createPage } = usePages();
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const newPageRef = React.useRef<PageCreateProps>({
    title: '',
  });
  const newPage = newPageRef.current;

  const onClose = () => {
    setVisible(false);
    setError(null);
  };

  const onSave = async () => {
    setLoading(true);

    const either = await createPage(newPage);

    either.fold(
      (e) => {
        setError(e);
      },
      () => {
        onClose();
      }
    );

    setLoading(false);
  };

  useEffect(() => {
    return addListener<PageCreateProps | undefined>(
      'openAddPageDialog',
      (page) => {
        newPage.title = 'Sin título';
        newPage.parent = undefined;
        newPage.expanded = undefined;

        if (page) {
          newPage.title = page.title ? page.title : 'Sin título';
          newPage.parent = page.parent;
          newPage.expanded = page.expanded;
        }

        setVisible(true);
      }
    );
  }, [addListener, newPage]);

  if (visible)
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
          <p className="mb-2">Escribe el título de la página:</p>
          <Input
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSave();
            }}
            autoFocus
            defaultValue={newPage.title}
            onChange={(e) => {
              newPage.title = e.target.value;
            }}
            className="w-full mb-2"
            placeholder="Título de la página"
          />
          {error ? <p className="mb-0 text-red-400">{error.message}</p> : null}
          <div className="flex mt-2">
            <Button
              disabled={loading}
              danger
              className="flex-1 mr-1"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              loading={loading}
              className="flex-1 ml-1"
              type="primary"
              onClick={onSave}
            >
              Guardar
            </Button>
          </div>
        </div>
      </div>
    );

  return null;
}
