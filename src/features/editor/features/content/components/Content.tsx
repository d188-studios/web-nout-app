import React from 'react';

import clsx from 'clsx';
import { Header } from './Header';

export interface ContentProps {
  className?: string;
  onPressMenu?: () => void;
  showMenuButton?: boolean;
}

export function Content({
  onPressMenu,
  showMenuButton,
  className,
}: ContentProps) {
  return (
    <div className={clsx(className)}>
      <Header
        showMenuButton={showMenuButton}
        onPressMenu={onPressMenu}
      />
    </div>
  );
}
