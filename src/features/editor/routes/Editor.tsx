import { Sidebar } from '../components/Sidebar';
import { Content } from '../components/Content';
import { EditorProviders } from '../providers';
import { RenamePageDialog } from '../components/RenamePageDialog';
import { DeletePageDialog } from '../components/DeletePageDialog';
import { AddPageDialog } from '../components/AddPageDialog';

export function Editor() {
  return (
    <EditorProviders>
      <div className="h-screen flex">
        <Sidebar />
        <Content />
        <RenamePageDialog />
        <DeletePageDialog />
        <AddPageDialog />
      </div>
    </EditorProviders>
  );
}
