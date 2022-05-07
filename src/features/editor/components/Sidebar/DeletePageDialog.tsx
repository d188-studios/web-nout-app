import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useEventEmitter } from '~/lib/eventemitter';
import { usePages, deletePage } from '../../stores/pages';
import { PageRenameProps } from '../../types';

export function DeletePageDialog() {
  const { addListener } = useEventEmitter();
  const { dispatch } = usePages();
  const [visible, setVisible] = React.useState(false);

  const currPageRef = React.useRef<PageRenameProps>({
    title: '',
    id: '',
  });
  const currPage = currPageRef.current;

  const onClose = () => {
    setVisible(false);
  };

  const onDelete = () => {
    // TODO: Delete page from server and then dispatch action to update store.
    dispatch(deletePage(currPage.id));

    onClose();
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
          <p className="mb-4">
            ¿Estás seguro de que quieres eliminar la página{' '}
            <strong>{currPage.title}</strong>?
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

  return null;
}
