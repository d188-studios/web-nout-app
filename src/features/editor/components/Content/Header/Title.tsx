import clsx from 'clsx';
import { useEditor } from '~/features/editor/stores/editor';
import { Page } from '~/features/editor/types';

export interface TitleProps {
  page: Page;
}

export function Title({ page }: TitleProps) {
  const { updatePage } = useEditor();

  return (
    <input
      className={clsx(
        'border-none focus:border-none p-0 flex-1 outline-none',
        page.title !== '' ? 'font-bold' : 'font-normal italic'
      )}
      placeholder="Ingrese un título..."
      type="text"
      value={page.title}
      onChange={(e) => {
        updatePage(page, { title: e.target.value });
      }}
    />
  );
}
