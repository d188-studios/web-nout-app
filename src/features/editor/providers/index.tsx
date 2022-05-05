import { EditorProvider } from '../stores/editor';

export function EditorProviders({ children }: { children: React.ReactNode }) {
  return <EditorProvider>{children}</EditorProvider>;
}
