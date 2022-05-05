import { Editor } from './Editor';
import { Header } from './Header';

export function Content() {
  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <Editor />
    </div>
  );
}
