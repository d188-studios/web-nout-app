import clsx from 'clsx';
import React from 'react';
import { useEffect } from 'react';
import { EditablePage, Page } from '~/features/editor/types';
import { useEventEmitter } from '~/lib/eventemitter';

export interface TitleProps {}

export function Title(props: TitleProps) {
  const [page, setPage] = React.useState<Page | null>(null);
  const { emit, addListener } = useEventEmitter();

  useEffect(() => {
    const removeOpenPageListener = addListener<Page>('openPage', setPage);
    const removeUpdatePageListener = addListener<Page>(
      'updateOpenPage',
      (updatedPage) => {
        setPage(updatedPage);
      }
    );
    const removeDeletePageListener = addListener(
      'deleteOpenPage',
      () => {
        setPage(null);
      }
    );

    return () => {
      removeOpenPageListener();
      removeUpdatePageListener();
      removeDeletePageListener();
    };
  }, [addListener]);

  if (page === null) return null;

  return (
    <input
      className={clsx(
        'border-none focus:border-none p-0 flex-1 outline-none bg-transparent',
        page.title !== '' ? 'font-bold' : 'font-normal italic'
      )}
      placeholder="Ingrese un título..."
      type="text"
      value={page.title}
      onChange={(e) => {
        emit<{
          page: Page;
          editedPage: EditablePage;
        }>('updatePage', {
          page,
          editedPage: {
            title: e.target.value,
          },
        });
      }}
    />
  );
}
