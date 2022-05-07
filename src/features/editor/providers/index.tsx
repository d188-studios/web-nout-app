import { PagesProvider } from '../stores/pages';

export function EditorProviders({ children }: { children: React.ReactNode }) {
  return (
    <PagesProvider>
      {children}
    </PagesProvider>
  );
}
