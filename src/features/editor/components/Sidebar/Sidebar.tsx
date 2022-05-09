import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useEventEmitter } from '~/lib/eventemitter';
import { useIsMobile } from '../../hooks/useIsMobile';
import { usePages } from '../../stores/pages';
import { Header } from './Header';
import { PageNodeContextMenu, PageTree } from './PageTree';
import UserContextMenu from './UserContextMenu';

export function Sidebar() {
  const {
    addListener
  } = useEventEmitter();

  const {
    fetchPages,
  } = usePages();

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const mobile = useIsMobile();
  const [visible, setVisible] = React.useState(!mobile);

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
      style={mobile ? {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        zIndex: 9999,
      } : undefined}
    >
      <Header />
      <PageTree />
      <PageNodeContextMenu />
      <UserContextMenu />
    </div>
  );
}
