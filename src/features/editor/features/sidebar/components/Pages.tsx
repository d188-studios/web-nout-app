import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { Page } from '../types';
import NewPageButton from './NewPageButton';
import { PageItem } from './PageItem';

const initialPages: Page[] = [];

export interface PagesProsp {
  className?: string;
  onOpenMenu?: (page: Page, position: {
    x: number;
    y: number;
  }) => void;
}

export default function Pages({ className, onOpenMenu }: PagesProsp) {
  const [pages, setPages] = useState(initialPages);

  return (
    <div className={clsx('relative', className)}>
      <div className="absolute inset-0 overflow-auto">
        {pages.map((page) => (
          <PageItem onOpenMenu={onOpenMenu} key={page.id} page={page} />
        ))}
        <NewPageButton
          onPress={() => {
            setPages([
              ...pages,
              {
                id: uuidv4(),
                title: `Sin título`,
                children: [],
                parent: null,
                expanded: false,
              },
            ]);
          }}
        />
      </div>
    </div>
  );
}
