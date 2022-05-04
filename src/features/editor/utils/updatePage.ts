import { Page } from '../types';
import { getPagePath } from './getPagePath';

export function updatePage(
  page: Page | string,
  newPage: {
    id?: string;
    title?: string;
    expanded?: boolean;
  },
  pages: Page[]
): Page[] {
  const path = getPagePath(page, pages);
  if (path.length === 0) return pages;

  const newPages: Page[] = JSON.parse(JSON.stringify(pages));

  let pageToUpdate = newPages[path[0]];
  for (let i = 1; i < path.length; i++)
    pageToUpdate = pageToUpdate.children[path[i]];

  if(newPage.id !== undefined)
    pageToUpdate.id = newPage.id;

  if(newPage.title !== undefined) 
    pageToUpdate.title = newPage.title;

  if(newPage.expanded !== undefined)
    pageToUpdate.expanded = newPage.expanded;

  return newPages;
}
