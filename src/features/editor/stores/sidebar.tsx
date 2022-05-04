import { EventEmitter } from 'eventemitter3';
import React, { useCallback, useRef } from 'react';
import { Position } from '../types';

export interface SidebarState {
  visible: boolean;
}

export interface SidebarProviderValue extends SidebarState {
  setVisible: (visible: boolean) => void;
  openUserContextMenu: (position: Position) => void;
  addOpenUserContextMenuListener: (
    onOpenUserContextMenu: (position: Position) => void
  ) => void;
}

export const SidebarContext = React.createContext<SidebarProviderValue>({
  visible: false,
  setVisible: () => {},
  openUserContextMenu: () => {},
  addOpenUserContextMenuListener: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const eventEmitter = useRef(new EventEmitter()).current;
  const [visible, setVisible] = React.useState(true);

  const openUserContextMenu = (position: Position) => {
    eventEmitter.emit('openUserContextMenu', position);
  };

  const addOpenUserContextMenuListener = useCallback(
    (onOpenUserContextMenu: (position: Position) => void) => {
      eventEmitter.on('openUserContextMenu', onOpenUserContextMenu);

      return () => {
        eventEmitter.off('openUserContextMenu', onOpenUserContextMenu);
      };
    },
    [eventEmitter]
  );

  return (
    <SidebarContext.Provider
      value={{
        visible,
        setVisible,
        openUserContextMenu,
        addOpenUserContextMenuListener,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return React.useContext(SidebarContext);
}
