import {
  CaretDownFilled,
  CaretRightFilled,
  EllipsisOutlined,
  FileOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import { Page } from '../types';

export interface PageItemProps {
  page: Page;
  onPress?: (page: Page) => void;
  onPressExpand?: (page: Page) => void;
  onOpenMenu?: (
    page: Page,
    position: {
      x: number;
      y: number;
    }
  ) => void;
  onPressAdd?: (page: Page) => void;
  level?: number;
  selectedPage?: Page;
}

export function PageItem({
  page,
  onPress,
  onPressAdd,
  onOpenMenu,
  onPressExpand,
  selectedPage,
  level = 1,
}: PageItemProps) {
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const selected = selectedPage ? selectedPage.id === page.id : false;

  return (
    <>
      <div
        className={clsx(
          `relative h-8 px-4 cursor-pointer select-none hover:bg-slate-300 transition-all flex items-center`,
          selected ? 'bg-slate-200' : undefined
        )}
        style={{
          paddingLeft: `${level}rem`,
        }}
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
        {page.children.length > 0 ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onPressExpand?.(page);
            }}
            className="mr-2 bg-transparent border-none shadow-none"
            size="small"
            icon={page.expanded ? <CaretDownFilled /> : <CaretRightFilled />}
          />
        ) : null}
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
              onClick={(e) => {
                e.stopPropagation();
                onPressAdd?.(page);
              }}
              size="small"
              icon={<PlusOutlined />}
            />
          </>
        ) : null}
      </div>
      {page.expanded
        ? page.children.map((child) => (
            <PageItem
              key={child.id}
              page={child}
              level={level + 1}
              {...{ onPress, onOpenMenu, onPressAdd, onPressExpand, selectedPage }}
            />
          ))
        : null}
    </>
  );
}
