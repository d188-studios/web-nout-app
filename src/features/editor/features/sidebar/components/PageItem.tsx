import {
  CaretDownFilled,
  CaretRightFilled,
  EllipsisOutlined,
  FileOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { Page } from '../types';

export interface PageItemProps {
  page: Page;
  onPress?: (page: Page) => void;
  onOpenMenu?: (
    page: Page,
    position: {
      x: number;
      y: number;
    }
  ) => void;
  onPressAdd?: (page: Page) => void;
}

export function PageItem({
  page,
  onPress,
  onPressAdd,
  onOpenMenu,
}: PageItemProps) {
  const [buttonsVisible, setButtonsVisible] = useState(false);

  return (
    <div
      className="relative h-8 px-4 cursor-pointer select-none hover:bg-slate-200 transition-all flex items-center"
      onClick={() => {
        onPress?.(page);
      }}
      onMouseEnter={() => {
        setButtonsVisible(true);
      }}
      onMouseLeave={() => {
        setButtonsVisible(false);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onOpenMenu?.(page, {
          x: e.pageX,
          y: e.pageY,
        });
      }}
    >
      {page.expanded ? (
        <CaretDownFilled className="mr-2" />
      ) : (
        <CaretRightFilled className="mr-2" />
      )}
      <FileOutlined />
      <p className="mb-0 flex-1 mx-2">{page.title}</p>
      {buttonsVisible ? (
        <>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onOpenMenu?.(page, {
                x: e.pageX,
                y: e.pageY,
              });
            }}
            className="mr-1 bg-transparent border-0 shadow-none"
            size="small"
            icon={<EllipsisOutlined />}
          />
          <Button
            onClick={() => onPressAdd?.(page)}
            size="small"
            icon={<PlusOutlined />}
          />
        </>
      ) : null}
    </div>
  );
}
