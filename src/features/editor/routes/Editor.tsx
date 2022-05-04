import { Sidebar } from '../components/Sidebar';
import { Content } from '../components/Content';
import { EditorProviders } from '../providers';

export function Editor() {
  return (
    <EditorProviders>
      <div className="h-screen flex">
        <Sidebar />
        <Content />
      </div>
    </EditorProviders>
  );
}
