import { Page } from '../types';
import { getPagePath } from './getPagePath';

export function pagesContain(page: Page | string, pages: Page[]): boolean {
  const path = getPagePath(page, pages);
  return path.length > 0;
}
