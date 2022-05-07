import clsx from 'clsx';
import React from 'react';
import { usePages, selectPage } from '~/features/editor/stores/pages';
import { useEventEmitter } from '~/lib/eventemitter';

export interface TitleProps {}

export function Title(props: TitleProps) {
  const { emit } = useEventEmitter();
  const { selectedPage, selectedPagePath, dispatch } = usePages();
  const [hoverPagePathId, setHoverPagePathId] = React.useState<string | null>(
    null
  );

  if (selectedPage === null) return null;

  return (
    <>
      <div className="mr-1 select-none">
        {selectedPagePath.map((page, i) => {
          if (i === selectedPagePath.length - 1) return null;

          return (
            <span key={page.id}>
              <span
                style={{
                  cursor: 'pointer',
                  textDecoration:
                    hoverPagePathId === page.id ? 'underline' : undefined,
                }}
                onClick={() => {
                  dispatch(selectPage(page.id));
                  setHoverPagePathId(null);
                }}
                onMouseEnter={() => setHoverPagePathId(page.id)}
                onMouseLeave={() => setHoverPagePathId(null)}
              >
                {page.title}
              </span>
              <span> / </span>
            </span>
          );
        })}
      </div>
      <span
        onClick={() => {
          emit('openRenamePageDialog', selectedPage);
        }}
        className={clsx(
          'cursor-pointer',
          selectedPage.title !== ''
            ? 'font-bold'
            : 'font-normal italic text-gray-400'
        )}
      >
        {selectedPage.title === ''
          ? 'Haz click para editar el título'
          : selectedPage.title}
      </span>
    </>
  );
}
