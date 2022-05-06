import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Page } from '~/features/editor/types';
import { useEventEmitter } from '~/lib/eventemitter';

export interface PageNodeActionsProps {
  visible?: boolean;
  page: Page;
}

export function PageNodeActions({ visible, page }: PageNodeActionsProps) {
  const { emit } = useEventEmitter();

  if (visible)
    return (
      <div className="flex">
        <Button
          onClick={(e) => {
            e.stopPropagation();

            emit('openPageContextMenu', {
              page,
              position: { x: e.pageX, y: e.pageY },
            });
          }}
          className="mr-1 bg-transparent border-0 shadow-none"
          size="small"
          icon={<EllipsisOutlined />}
        />
        <Button
          onClick={(e) => {
            e.stopPropagation();

            emit('openAddPageDialog', {
              parent: page.id,
            });
          }}
          size="small"
          icon={<PlusOutlined />}
        />
      </div>
    );

  return null;
}
