import clsx from 'clsx';
import React from 'react';
import { useEffect } from 'react';
import { EditablePage, Page, PagePath } from '~/features/editor/types';
import { useEventEmitter } from '~/lib/eventemitter';

export interface TitleProps {}

export function Title(props: TitleProps) {
  const [page, setPage] = React.useState<Page | null>(null);
  const [pagePath, setPagePath] = React.useState<PagePath[]>([]);
  const { emit, addListener } = useEventEmitter();
  const [hoverPagePathId, setHoverPagePathId] = React.useState<string | null>(
    null
  );

  useEffect(() => {
    const removeOpenPageListener = addListener<Page>('openPage', setPage);
    const removeOpenPagePathListener = addListener<PagePath[] | null>(
      'openPagePath',
      (pagePath) => {
        setPagePath(pagePath ?? []);
        setHoverPagePathId(null);
      }
    );

    const removeUpdatePageListener = addListener<Page>(
      'updateOpenPage',
      (updatedPage) => {
        setPage(updatedPage);
      }
    );

    const removeDeletePageListener = addListener('deleteOpenPage', () => {
      setPage(null);
    });

    return () => {
      removeOpenPageListener();
      removeOpenPagePathListener();
      removeUpdatePageListener();
      removeDeletePageListener();
    };
  }, [addListener]);

  if (page === null) return null;

  return (
    <>
      <div className="mr-1 cursor-pointer">
        {pagePath.map((pagePath) => {
          return (
            <span key={pagePath.id}>
              <span
                style={{
                  textDecoration:
                    hoverPagePathId === pagePath.id ? 'underline' : undefined,
                }}
                onClick={() => {
                  emit('openPage', {
                    id: pagePath.id,
                    title: pagePath.title,
                  });
                }}
                onMouseEnter={() => {
                  setHoverPagePathId(pagePath.id);
                }}
                onMouseLeave={() => {
                  setHoverPagePathId(null);
                }}
              >
                {pagePath.title}
              </span>
              <span> / </span>
            </span>
          );
        })}
      </div>
      <input
        className={clsx(
          'border-none focus:border-none p-0 flex-1 outline-none bg-transparent',
          page.title !== '' ? 'font-bold' : 'font-normal italic'
        )}
        style={{
          minWidth: 0,
        }}
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
    </>
  );
}
