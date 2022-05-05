import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Page } from '~/features/editor/types';
import { v4 as uuidv4 } from 'uuid';
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

            const title = prompt(
              'Escribe el título de la página',
              'Sin título'
            );
            emit<{
              page: Page;
              newPage: Page;
            }>('addPage', {
              page,
              newPage: {
                id: uuidv4(),
                children: [],
                title: title !== null ? title : 'Sin título',
                expanded: false,
              },
            });
          }}
          size="small"
          icon={<PlusOutlined />}
        />
      </div>
    );

  return null;
}
