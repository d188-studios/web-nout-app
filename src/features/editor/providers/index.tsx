import { EditorProvider } from '../stores/editor';
import { SidebarProvider } from '../stores/sidebar';

export function EditorProviders({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <EditorProvider>{children}</EditorProvider>
    </SidebarProvider>
  );
}
