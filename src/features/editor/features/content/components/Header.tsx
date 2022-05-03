import clsx from 'clsx';
import { Button } from 'antd';
import { DoubleRightOutlined, MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Page } from '../../sidebar';

export interface SidebarProps {
  className?: string;
  showMenuButton?: boolean;
  onPressMenu?: () => void;
  page?: Page;
}

export function Header({
  className,
  onPressMenu,
  showMenuButton,
  page
}: SidebarProps) {
  const [hoverMenu, setHoverMenu] = useState(false);

  return (
    <div className={clsx('px-4 h-16 flex items-center', className)}>
      {showMenuButton ? (
        <Button
          onMouseEnter={() => setHoverMenu(true)}
          onMouseLeave={() => setHoverMenu(false)}
          className='bg-transparent border-0 shadow-none'
          onClick={() => {
            onPressMenu?.();
            setHoverMenu(false);
          }}
          icon={hoverMenu ? <DoubleRightOutlined /> : <MenuOutlined />}
        />
      ) : null}
      <span
        className='mx-2'
      >
        {page ? page.title : null}
      </span>
    </div>
  );
}
