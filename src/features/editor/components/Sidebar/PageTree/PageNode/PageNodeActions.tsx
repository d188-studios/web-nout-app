import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useIsMobile } from '~/features/editor/hooks/useIsMobile';
import { Page } from '~/features/editor/types';
import { useEventEmitter } from '~/lib/eventemitter';

export interface PageNodeActionsProps {
  visible?: boolean;
  page: Page;
}

export function PageNodeActions({ visible, page }: PageNodeActionsProps) {
  const { emit } = useEventEmitter();

  const mobile = useIsMobile();

  if (visible || mobile)
    return (
      <div className="flex">
        <Button
          onClick={(e) => {
            e.stopPropagation();

            const { y } = e.currentTarget.getBoundingClientRect();

            emit('openPageContextMenu', {
              page,
              position: {
                x: e.pageX,
                y: mobile ? y + e.currentTarget.clientHeight : e.pageY,
              },
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
