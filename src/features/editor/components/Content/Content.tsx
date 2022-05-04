import { useEditor } from '../../stores/editor';
import { Editor } from './Editor';
import { Header } from './Header';

export function Content() {
  const { selectedPage } = useEditor();

  return (
    <div className="flex-1 flex flex-col">
      {/* <Header /> */}
      {selectedPage ? <Editor page={selectedPage} /> : null}
    </div>
  );
}
