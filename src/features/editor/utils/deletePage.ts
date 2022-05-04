import { Page } from '../types';
import { getPagePath } from './getPagePath';

export function deletePage(page: Page | string, pages: Page[]): Page[] {
  const path = getPagePath(page, pages);
  if (path.length === 0) return pages;

  const newPages: Page[] = JSON.parse(JSON.stringify(pages));

  let parentPages = newPages;
  for (let i = 0; i < path.length - 1; i++)
    parentPages = parentPages[path[i]].children;

  parentPages.splice(path[path.length - 1], 1);

  return newPages;
}
