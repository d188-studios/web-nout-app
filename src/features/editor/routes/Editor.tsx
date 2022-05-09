import { Sidebar } from '../components/Sidebar';
import { Content } from '../components/Content';
import { EditorProviders } from '../providers';
import { AddPageDialog } from '../components/Sidebar/AddPageDialog';
import { RenamePageDialog } from '../components/Sidebar/RenamePageDialog';
import { DeletePageDialog } from '../components/Sidebar/DeletePageDialog';
import { CopyPageDialog } from '../components/Sidebar/CopyPageDialog';

export function Editor() {
  return (
    <EditorProviders>
      <div className="h-screen flex">
        <Sidebar />
        <Content />
        <RenamePageDialog />
        <DeletePageDialog />
        <AddPageDialog />
        <CopyPageDialog />
      </div>
    </EditorProviders>
  );
}
