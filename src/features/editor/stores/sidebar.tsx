import React from 'react';

export interface SidebarState {
  visible: boolean;
}

export interface SidebarProviderValue extends SidebarState {
  setVisible: (visible: boolean) => void;
}

export const SidebarContext = React.createContext<SidebarProviderValue>({
  visible: false,
  setVisible: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = React.useState(false);

  return (
    <SidebarContext.Provider value={{ visible, setVisible }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return React.useContext(SidebarContext);
}
