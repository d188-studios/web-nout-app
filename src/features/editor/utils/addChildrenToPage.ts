import { Page } from '../types';
import { getPagePath } from './getPagePath';

export function addChildrenToPage(
  page: Page | string | null,
  children: Page[] | Page,
  pages: Page[]
): Page[] {
  if (page === null) {
    let newPages: Page[] = JSON.parse(JSON.stringify(pages));

    if(Array.isArray(children))
      newPages = newPages.concat(children);
    else
      newPages.push(children);

    return newPages;
  } else {
    const path = getPagePath(page, pages);
    if (path.length === 0) return pages;

    const newPages: Page[] = JSON.parse(JSON.stringify(pages));

    let pageToUpdate = newPages[path[0]];
    for (let i = 1; i < path.length; i++)
      pageToUpdate = pageToUpdate.children[path[i]];

    if (Array.isArray(children))
      pageToUpdate.children = pageToUpdate.children.concat(children);
    else pageToUpdate.children.push(children);

    pageToUpdate.expanded = true;

    return newPages;
  }
}
