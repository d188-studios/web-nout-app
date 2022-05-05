import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useEventEmitter } from '~/lib/eventemitter';
import { Header } from './Header';
import { PageNodeContextMenu, PageTree } from './PageTree';
import UserContextMenu from './UserContextMenu';

export function Sidebar() {
  const {
    addListener
  } = useEventEmitter();

  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    return addListener('openSidebar', () => {
      setVisible(true);
    })
  }, [addListener]);

  useEffect(() => {
    return addListener('closeSidebar', () => {
      setVisible(false);
    })
  }, [addListener]);

  return (
    <div
      className={clsx(
        'w-80 flex-col bg-slate-100',
        visible ? 'flex' : 'hidden'
      )}
    >
      <Header />
      <PageTree />
      <PageNodeContextMenu />
      <UserContextMenu />
    </div>
  );
}
