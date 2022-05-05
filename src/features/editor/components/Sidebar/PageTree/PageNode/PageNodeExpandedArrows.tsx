import {
  CaretDownFilled,
  CaretRightFilled,
} from '@ant-design/icons';
import { Button } from 'antd';
import { Page } from '~/features/editor/types';
import { useEventEmitter } from '~/lib/eventemitter';

export interface PageNodeExpandedArrowsProps {
  page: Page;
}

export function PageNodeExpandedArrows({
  page
}: PageNodeExpandedArrowsProps) {
  const {
    emit
  } = useEventEmitter();

  const visible = page.children.length > 0;
  const expanded = page.expanded;

  if (visible)
    return (
      <Button
        onClick={(e) => {
          e.stopPropagation();
          emit('togglePageExpanded', page);
        }}
        className="mr-2 bg-transparent border-none shadow-none"
        size="small"
        icon={expanded ? <CaretDownFilled /> : <CaretRightFilled />}
      />
    );

  return null;
}
