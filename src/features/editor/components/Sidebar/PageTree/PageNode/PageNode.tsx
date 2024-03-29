import { FileOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '~/features/editor/types';
import { useEventEmitter } from '~/lib/eventemitter';
import { PageNodeActions } from './PageNodeActions';
import { PageNodeExpand } from './PageNodeExpand';

export interface PageNodeProps {
  page: Page;
  level?: number;
}

export function PageNode({ page, level = 1 }: PageNodeProps) {
  const navigate = useNavigate();
  const { selectedPageId } = useParams();
  const { emit } = useEventEmitter();
  const [actionsVisible, setActionsVisible] = useState(false);

  const selected = selectedPageId !== undefined && selectedPageId === page.id;

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
          navigate(`/${page.id}`);
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
