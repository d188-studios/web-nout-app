import { PlusOutlined } from '@ant-design/icons';

export interface NewPageButtonProps {
  onPress?: () => void;
}

export default function NewPageButton({ onPress }: NewPageButtonProps) {
  return (
    <div
      className="flex items-center h-8 px-4 cursor-pointer select-none hover:bg-slate-200 transition-all"
      onClick={onPress}
    >
      <PlusOutlined className="mr-2" />
      <span>
      Nueva página
      </span>
    </div>
  );
}
