import React, { useImperativeHandle } from 'react';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState } from 'react';
import { Page } from '../types';
import NewPageButton from './NewPageButton';
import { PageItem } from './PageItem';

const initialPages: Page[] = [];

export interface PagesHandle {
  deletePage: (page: Page) => void;
  renamePage: (page: Page, title: string) => void;
}

export interface PagesProps {
  className?: string;
  onSelectedPageChange?: (page: Page) => void;
  selectedPage?: Page;
  openMenu?: (
    page: Page,
    position: {
      x: number;
      y: number;
    }
  ) => void;
}

export const Pages = React.forwardRef<PagesHandle, PagesProps>(
  ({ className, openMenu, onSelectedPageChange, selectedPage }, ref) => {
    const pagesRef = useRef<Page[]>(initialPages);
    const pages = pagesRef.current;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setCount] = useState(0);

    const forceUpdate = () => {
      setCount((count) => count + 1);
    };

    const expandPage = (page: Page) => {
      page.expanded = page.children.length === 0 ? false : !page.expanded;
      forceUpdate();
    };

    const newPage = (parent?: Page) => {
      let title = 'Sin titulo';

      const newTitle = prompt('Nuevo titulo', title);
      if (newTitle !== null) title = newTitle;

      const newPage: Page = {
        id: uuidv4(),
        title,
        children: [],
        expanded: false,
        parent: parent !== undefined ? parent : null,
      };

      if (parent) {
        parent.expanded = true;
        parent.children.push(newPage);
      } else pages.push(newPage);

      forceUpdate();
    };

    useImperativeHandle(ref, () => ({
      deletePage: (page: Page) => {
        if (page.parent)
          page.parent.children = page.parent.children.filter(
            (child) => child.id !== page.id
          );
        else pagesRef.current = pages.filter((child) => child.id !== page.id);

        forceUpdate();
      },
      renamePage: (page: Page, title: string) => {
        page.title = title;
        forceUpdate();
      },
    }));

    return (
      <div className={clsx('relative', className)}>
        <div className="absolute inset-0 overflow-auto">
          {pages.map((page) => (
            <PageItem
              selectedPage={selectedPage}
              onPress={onSelectedPageChange}
              onPressAdd={newPage}
              onPressExpand={expandPage}
              onOpenMenu={openMenu}
              key={page.id}
              page={page}
            />
          ))}
          <NewPageButton onPress={() => newPage()} />
        </div>
      </div>
    );
  }
);
