import { Skeleton } from 'antd';
import { usePages } from '~/features/editor/stores/pages';
import NewPageButton from './NewPageButton';
import { PageNode } from './PageNode';

export function PageTree() {
  const { pages, loading } = usePages();

  return (
    <div className="flex-1 relative">
      <div className="absolute inset-0 w-80 overflow-auto">
        {loading ? (
          <Skeleton.Input
            block
            className="h-full"
            active
            style={{
              height: '100%',
            }}
          />
        ) : (
          <>
            {pages.map((page) => (
              <PageNode key={page.id} page={page} />
            ))}
            <NewPageButton />
          </>
        )}
      </div>
    </div>
  );
}
