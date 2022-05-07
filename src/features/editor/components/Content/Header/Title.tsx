import clsx from 'clsx';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePages } from '~/features/editor/stores/pages';
import { useEventEmitter } from '~/lib/eventemitter';

export interface TitleProps {}

export function Title(props: TitleProps) {
  const navigate = useNavigate();
  const { selectedPageId } = useParams();
  const { emit } = useEventEmitter();
  const [hoverPagePathId, setHoverPagePathId] = React.useState<string | null>(
    null
  );
  const { findPage, getPagePath } = usePages();

  const selectedPage = useMemo(() => {
    if(selectedPageId === undefined) return null;

    return findPage(selectedPageId);
  }, [selectedPageId, findPage]);

  const selectedPagePath = useMemo(() => {
    if(selectedPageId === undefined) return [];

    return getPagePath(selectedPageId);
  }, [selectedPageId, getPagePath]);

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
                  navigate(`/${page.id}`);
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
