import {
  CaretDownFilled,
  CaretRightFilled,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useEditor } from '~/features/editor/stores/editor';
import { Page } from '~/features/editor/types';

export interface PageNodeExpandedArrowsProps {
  page: Page;
}

export function PageNodeExpandedArrows({
  page
}: PageNodeExpandedArrowsProps) {
  const {
    updatePage,
  } = useEditor();

  const visible = page.children.length > 0;
  const expanded = page.expanded;

  if (visible)
    return (
      <Button
        onClick={(e) => {
          e.stopPropagation();
          updatePage(page, {
            expanded: !expanded,
          });
        }}
        className="mr-2 bg-transparent border-none shadow-none"
        size="small"
        icon={expanded ? <CaretDownFilled /> : <CaretRightFilled />}
      />
    );

  return null;
}
