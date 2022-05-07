import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useEventEmitter } from '~/lib/eventemitter';
import { useNotifications } from '~/lib/notifications';
import { usePages } from '../../stores/pages';
import { PageRenameProps } from '../../types';

export function DeletePageDialog() {
  const { addListener } = useEventEmitter();
  const notifications = useNotifications();
  const { deletePage } = usePages();
  const [visible, setVisible] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(false);

  const currPageRef = React.useRef<PageRenameProps>({
    title: '',
    id: '',
  });
  const currPage = currPageRef.current;

  const onClose = () => {
    setVisible(false);
    setError(null);
  };

  const onDelete = async () => {
    setLoading(true);

    notifications.notify({
      name: 'page:delete',
      message: 'Eliminando página.',
    });

    const either = await deletePage(currPage.id);

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
    return addListener<PageRenameProps>('openDeletePageDialog', (page) => {
      currPage.title = page.title;
      currPage.id = page.id;

      setVisible(true);
    });
  }, [addListener, currPage]);

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
          <p className="mb-2">
            ¿Estás seguro de que quieres eliminar la página{' '}
            <strong>{currPage.title}</strong>?
          </p>
          {error ? <p className="mb-2 text-red-400">{error.message}</p> : null}
          <div className="flex mt-2">
            <Button
              disabled={loading}
              className="flex-1 mr-1"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              danger
              className="flex-1 ml-1"
              type="primary"
              onClick={onDelete}
              loading={loading}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    );

  return null;
}
