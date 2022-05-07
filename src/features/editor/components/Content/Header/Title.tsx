import clsx from 'clsx';
import React from 'react';
import { renamePage, usePages, selectPage } from '~/features/editor/stores/pages';

export interface TitleProps {}

export function Title(props: TitleProps) {
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
      <input
        className={clsx(
          'border-none focus:border-none p-0 flex-1 outline-none bg-transparent',
          selectedPage.title !== '' ? 'font-bold' : 'font-normal italic'
        )}
        style={{
          minWidth: 0,
        }}
        placeholder="Ingrese un título..."
        type="text"
        value={selectedPage.title}
        onChange={(e) => {
          dispatch(
            renamePage({
              id: selectedPage.id,
              title: e.target.value,
            })
          );
        }}
      />
    </>
  );
}
