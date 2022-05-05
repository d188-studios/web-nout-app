import { v4 as uuidv4 } from 'uuid';
import { PlusOutlined } from '@ant-design/icons';
import { useEventEmitter } from '~/lib/eventemitter';

export interface NewPageButtonProps {}

export default function NewPageButton(props: NewPageButtonProps) {
  const { emit } = useEventEmitter();

  return (
    <div
      className="flex items-center h-8 px-4 cursor-pointer select-none hover:bg-slate-300 transition-all"
      onClick={() => {
        emit('openAddPageDialog', {
          page: {
            id: uuidv4(),
            title: 'Sin título',
            children: [],
            expanded: false,
          },
        });
      }}
    >
      <PlusOutlined className="mr-2" />
      <span>Nueva página</span>
    </div>
  );
}
