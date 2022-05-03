import { useCallback, useRef, useState } from 'react';

import clsx from 'clsx';
import { Header } from './Header';
import { Pages, PagesHandle } from './Pages';
import { PageMenu } from './PageMenu';
import { Page } from '../types';

export interface SidebarProps {
  className?: string;
  visible?: boolean;
  onClose?: () => void;
  selectedPage?: Page;
  onSelectedPageChange?: (page: Page) => void;
}

export function Sidebar({
  className,
  visible,
  onClose,
  selectedPage,
  onSelectedPageChange,
}: SidebarProps) {
  const [focusedPage, setFocusedPage] = useState<Page | null>(null);
  const [menuPosition, setMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const onPressOutsideMenu = useCallback(() => {
    setFocusedPage(null);
  }, []);
  const pagesRef = useRef<PagesHandle>(null);

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
        ref={pagesRef}
        className="flex-1"
        openMenu={(page, position) => {
          setFocusedPage(page);
          setMenuPosition(position);
        }}
        selectedPage={selectedPage}
        onSelectedPageChange={onSelectedPageChange}
      />
      {focusedPage ? (
        <PageMenu
          onPressOutside={onPressOutsideMenu}
          page={focusedPage}
          position={menuPosition}
          onPressDelete={(page) => {
            if (pagesRef.current) pagesRef.current.deletePage(page);
            setFocusedPage(null);
          }}
          onPressEdit={(page) => {
            if (pagesRef.current) {
              const newTitle = prompt('Nuevo titulo', page.title);
              if (newTitle !== null) {
                pagesRef.current.renamePage(page, newTitle);
                if (selectedPage && selectedPage.id === page.id)
                  onSelectedPageChange?.(page);
              }
            }

            setFocusedPage(null);
          }}
        />
      ) : null}
    </div>
  );
}
