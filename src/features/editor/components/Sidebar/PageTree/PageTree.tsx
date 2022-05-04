import { useEditor } from '~/features/editor/stores/editor';
import NewPageButton from './NewPageButton';
import { PageNode } from './PageNode';

export function PageTree() {
  const { pages } = useEditor();

  return (
    <div className="flex-1 relative">
      <div className="absolute inset-0 w-80">
        {pages.map((page) => (
          <PageNode key={page.id} page={page} />
        ))}
        <NewPageButton />
      </div>
    </div>
  );
}
