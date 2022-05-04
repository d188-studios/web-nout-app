import clsx from 'clsx';
import { useSidebar } from '../../stores/sidebar';
import { Header } from './Header';
import { PageNodeContextMenu, PageTree } from './PageTree';

export function Sidebar() {
  const { visible } = useSidebar();

  return (
    <div
      className={clsx(
        'w-80 flex-col bg-slate-100',
        visible ? 'flex' : 'hidden'
      )}
    >
      <Header />
      <PageTree />
      <PageNodeContextMenu />
    </div>
  );
}
