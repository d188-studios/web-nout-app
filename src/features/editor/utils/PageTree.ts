import { Page, PageCreateProps, PageInsertProps, PageUpdateProps } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class PageTree {
  constructor(public pages: Page[] = []) {}

  private _findPage(id: string, pages: Page[]): Page | null {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      if (page.id === id) return page;
      if (page.children.length > 0) return this._findPage(id, page.children);
    }

    return null;
  }

  findPage(id: string) {
    return this._findPage(id, this.pages);
  }

  findPageInParent(parentId: string, pageId: string): Page | null {
    const parent = this.findPage(parentId);

    if (parent === null) return null;

    return this._findPage(pageId, parent.children);
  }

  insertPage(page: PageInsertProps): Page | null {
    if (page.parent === undefined) {
      const l = this.pages.push({
        ...page,
        children: [],
      });

      return this.pages[l - 1];
    }

    const parent = this.findPage(page.parent);

    if (parent !== null) {
      const l = parent.children.push({
        ...page,
        children: [],
        parent: parent.id,
      });

      return parent.children[l - 1];
    }

    return null;
  }

  createPage(page: PageCreateProps): Page | null {
    return this.insertPage({
      ...page,
      id: uuidv4(),
      title: page.title !== undefined ? page.title : '',
    });
  }

  private _deletePage(id: string, pages: Page[]): Page | null {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      if (page.id === id) {
        pages.splice(i, 1);
        return page;
      }

      if (page.children.length > 0) {
        const child = this._deletePage(id, page.children);

        if (child !== null) return child;
      }
    }

    return null;
  }

  deletePage(id: string): Page | null {
    return this._deletePage(id, this.pages);
  }

  updatePage(page: PageUpdateProps): Page | null {
    const pageToUpdate = this.findPage(page.id);

    if (pageToUpdate !== null) {
      if (page.title !== undefined) pageToUpdate.title = page.title;
      if (page.expanded !== undefined) pageToUpdate.expanded = page.expanded;

      return pageToUpdate;
    }

    return null;
  }

  renamePage(id: string, title: string): Page | null {
    return this.updatePage({ id, title });
  }

  expandPage(id: string): Page | null {
    return this.updatePage({ id, expanded: true });
  }

  collapsePage(id: string): Page | null {
    return this.updatePage({ id, expanded: false });
  }

  toggleExpandPage(id: string): Page | null {
    const page = this.findPage(id);

    if (page !== null) {
      page.expanded = !page.expanded;
      return page;
    }

    return null;
  }
}
