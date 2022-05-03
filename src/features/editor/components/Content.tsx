import React from 'react';

import clsx from 'clsx';

export interface ContentProps {
  className?: string;
  onPressMenu?: () => void;
}

export function Content({ onPressMenu, className }: ContentProps) {
  return (
    <div className={clsx(className)}>
      <button onClick={onPressMenu}>Press me</button>
    </div>
  );
}
