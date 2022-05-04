import { FileOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useState } from 'react';
import { useEditor } from '~/features/editor/stores/editor';
import { Page } from '~/features/editor/types';
import { PageNodeActions } from './PageNodeActions';
import { PageNodeExpandedArrows } from './PageNodeExpandedArrows';

export interface PageNodeProps {
  page: Page;
  level?: number;
}

export function PageNode({ page, level = 1 }: PageNodeProps) {
  const { openPageContextMenu, setSelectedPage, selectedPage } =
    useEditor();
  const [actionsVisible, setActionsVisible] = useState(false);
  const selected = selectedPage !== null && selectedPage.id === page.id;

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

          openPageContextMenu(page, { x: e.pageX, y: e.pageY });
        }}
        onClick={() => {
          setSelectedPage(page);
        }}
      >
        <PageNodeExpandedArrows page={page} />
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
