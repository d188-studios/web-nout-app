import { v4 as uuidv4 } from 'uuid';
import { PlusOutlined } from '@ant-design/icons';
import { useEventEmitter } from '~/lib/eventemitter';
import { Page } from '~/features/editor/types';

export interface NewPageButtonProps {}

export default function NewPageButton(props: NewPageButtonProps) {
  const { emit } = useEventEmitter();

  return (
    <div
      className="flex items-center h-8 px-4 cursor-pointer select-none hover:bg-slate-300 transition-all"
      onClick={() => {
        const title = prompt('Escribe el título de la página', 'Sin título');

        emit<Page>('addRootPage', {
          id: uuidv4(),
          title: title !== null ? title : 'Sin título',
          children: [],
          expanded: false,
        });
      }}
    >
      <PlusOutlined className="mr-2" />
      <span>Nueva página</span>
    </div>
  );
}
