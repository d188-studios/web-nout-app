import { useCallback, useState } from 'react';

import clsx from 'clsx';
import { Header } from './Header';
import Pages from './Pages';
import { PageItemMenu } from './PageItemMenu';
import { Page } from '../types';

export interface SidebarProps {
  className?: string;
  visible?: boolean;
  onClose?: () => void;
}

export function Sidebar({ className, visible, onClose }: SidebarProps) {
  const [page, setPage] = useState<Page | null>(null);
  const [menuPosition, setMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const onPressOutsideMenu = useCallback(() => {
    setPage(null);
  }, []);

  return (
    <div
      className={clsx(
        `flex
      flex-col
    bg-slate-100`,
        visible ? 'block' : 'hidden',
        className
      )}
    >
      <Header onPressClose={onClose} />
      <Pages
        className="flex-1"
        onOpenMenu={(page, position) => {
          setPage(page);
          setMenuPosition(position);
        }}
      />
      {page ? (
        <PageItemMenu
          onPressOutside={onPressOutsideMenu}
          page={page}
          position={menuPosition}
          onPressDelete={(page) => {
            console.log('delete', page);
            setPage(null);
          }}
          onPressEdit={(page) => {
            console.log('edit', page);
            setPage(null);
          }}
        />
      ) : null}
    </div>
  );
}
