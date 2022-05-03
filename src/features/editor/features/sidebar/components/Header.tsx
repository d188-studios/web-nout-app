import clsx from 'clsx';
import { Button } from 'antd';
import { DoubleLeftOutlined } from '@ant-design/icons';

export interface SidebarProps {
  className?: string;
  onPressClose?: () => void;
}

export function Header({ className, onPressClose }: SidebarProps) {
  const username = 'John Doe';

  return (
    <div className={clsx('w-full flex p-4 items-center', className)}>
      <p className="flex-1 mb-0">
        {username}
      </p>
      <Button
        className='bg-transparent border-0 shadow-none'
        onClick={onPressClose}
        icon={<DoubleLeftOutlined />}
      />
    </div>
  );
}
