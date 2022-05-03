import React from 'react';

import clsx from 'clsx';
import { Header } from './Header';
import { Page } from '../../sidebar';

export interface ContentProps {
  className?: string;
  onPressMenu?: () => void;
  showMenuButton?: boolean;
  page?: Page;
}

export function Content({
  onPressMenu,
  showMenuButton,
  className,
  page,
}: ContentProps) {
  return (
    <div className={clsx(className)}>
      <Header
        page={page}
        showMenuButton={showMenuButton}
        onPressMenu={onPressMenu}
      />
    </div>
  );
}
