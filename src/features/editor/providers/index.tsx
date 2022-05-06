import { EditorProvider } from '../stores/editor';
import { PagesProvider } from '../stores/pages';

export function EditorProviders({ children }: { children: React.ReactNode }) {
  return (
    <PagesProvider>
      <EditorProvider>{children}</EditorProvider>;
    </PagesProvider>
  );
}
