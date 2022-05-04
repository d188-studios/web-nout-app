import { Page } from '../types';

function getPagePathRecursive(page: Page | string, pages: Page[], path: number[]): boolean {
  const pageId = typeof page === 'string' ? page : page.id;

  for(let i = 0; i < pages.length; i++) {
    const currentPage = pages[i];
    let found = false;

    if(currentPage.children.length > 0)
      found = getPagePathRecursive(page, currentPage.children, path);

    if(found || currentPage.id === pageId) {
      path.push(i);
      return true;
    }
  }

  return false;
}

export function getPagePath(page: Page | string, pages: Page[]): number[] {
  const path: number[] = [];

  getPagePathRecursive(page, pages, path);

  return path.reverse();
}