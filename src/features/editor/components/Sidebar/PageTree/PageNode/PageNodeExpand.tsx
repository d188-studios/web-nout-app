import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { usePages, toggleExpandPage } from '~/features/editor/stores/pages';
import { Page } from '~/features/editor/types';

export interface PageNodeExpandProps {
  page: Page;
}

export function PageNodeExpand({ page }: PageNodeExpandProps) {
  const { dispatch } = usePages();

  const visible = page.children.length > 0;
  const expanded = page.expanded;

  if (visible)
    return (
      <Button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(toggleExpandPage(page.id));
        }}
        className="mr-2 bg-transparent border-none shadow-none"
        size="small"
        icon={expanded ? <CaretDownFilled /> : <CaretRightFilled />}
      />
    );

  return null;
}
