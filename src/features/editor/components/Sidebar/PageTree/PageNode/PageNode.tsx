import { FileOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Page } from '~/features/editor/types';
import { useEventEmitter } from '~/lib/eventemitter';
import { PageNodeActions } from './PageNodeActions';
import { PageNodeExpand } from './PageNodeExpand';

export interface PageNodeProps {
  page: Page;
  level?: number;
}

export function PageNode({ page, level = 1 }: PageNodeProps) {
  const { emit, addListener } = useEventEmitter();
  const [actionsVisible, setActionsVisible] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    return addListener<Page>('openPage', (openPage) =>
      setSelected(openPage.id === page.id)
    );
  }, [addListener, page.id]);

  return (
    <>
      <div
        className={clsx(
          `h-8 px-4 cursor-pointer select-none hover:bg-slate-300 transition-all flex items-center`,
          selected ? 'bg-slate-200' : undefined
        )}
        style={{
          paddingLeft: `${level}rem`,
        }}
        onMouseEnter={() => {
          setActionsVisible(true);
        }}
        onMouseLeave={() => {
          setActionsVisible(false);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();

          emit('openPageContextMenu', {
            page,
            position: { x: e.pageX, y: e.pageY },
          });
        }}
        onClick={() => {
          // emit('openPage', page);
        }}
      >
        <PageNodeExpand page={page} />
        <div className="flex flex-1 overflow-hidden mr-2 items-center">
          <FileOutlined />
          <p
            className={clsx(
              'mb-0 ml-2 truncate',
              selected ? 'font-bold' : undefined
            )}
          >
            {page.title}
          </p>
        </div>
        <PageNodeActions visible={actionsVisible} page={page} />
      </div>
      {page.expanded
        ? page.children.map((child) => (
            <PageNode key={child.id} page={child} level={level + 1} />
          ))
        : null}
    </>
  );
}
