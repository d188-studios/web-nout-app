import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEditor } from '~/features/editor/stores/editor';
import { Page } from '~/features/editor/types';
import { v4 as uuidv4 } from 'uuid';

export interface PageNodeActionsProps {
  visible?: boolean;
  page: Page;
}

export function PageNodeActions({ visible, page }: PageNodeActionsProps) {
  const { addPage, openPageContextMenu } = useEditor();

  if (visible)
    return (
      <div className='flex'>
        <Button
          onClick={(e) => {
            e.stopPropagation();

            openPageContextMenu(page, {
              x: e.pageX,
              y: e.pageY,
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

            addPage(page, {
              id: uuidv4(),
              children: [],
              title: title !== null ? title : 'Sin título',
              expanded: false,
            });
          }}
          size="small"
          icon={<PlusOutlined />}
        />
      </div>
    );

  return null;
}