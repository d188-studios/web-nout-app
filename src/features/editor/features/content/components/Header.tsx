import clsx from 'clsx';
import { Button } from 'antd';
import { DoubleRightOutlined, MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';

export interface SidebarProps {
  className?: string;
  showMenuButton?: boolean;
  onPressMenu?: () => void;
}

export function Header({
  className,
  onPressMenu,
  showMenuButton,
}: SidebarProps) {
  const [hoverMenu, setHoverMenu] = useState(false);

  return (
    <div className={clsx('p-4', className)}>
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
    </div>
  );
}
