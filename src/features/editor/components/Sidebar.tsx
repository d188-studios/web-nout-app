import React from 'react';

import clsx from 'clsx';

export interface SidebarProps {
  className?: string;
  visible?: boolean;
  onClose?: () => void;
}

export function Sidebar({ className, visible, onClose }: SidebarProps) {
  return (
    <div className={clsx('bg-red-500', visible ? 'block' : 'hidden', className)}>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
