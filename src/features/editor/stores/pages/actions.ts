import {
  Page,
  PageCreateProps,
  PageInsertProps,
  PageRenameProps,
  PagesAction,
  PageUpdateProps,
} from '../../types';

export const _setPages = (pages: Page[]): PagesAction => ({
  type: 'SET_PAGES',
  payload: pages,
});

export const _setLoading = (loading: boolean): PagesAction => ({
  type: 'SET_LOADING',
  payload: loading,
});

export const _insertPage = (page: PageInsertProps): PagesAction => ({
  type: 'INSERT_PAGE',
  payload: page,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const _createPage = (page: PageCreateProps): PagesAction => ({
  type: 'CREATE_PAGE',
  payload: page,
});

export const updatePage = (page: PageUpdateProps): PagesAction => ({
  type: 'UPDATE_PAGE',
  payload: page,
});

export const _deletePage = (id: string): PagesAction => ({
  type: 'DELETE_PAGE',
  payload: id,
});

export const _renamePage = (page: PageRenameProps): PagesAction => ({
  type: 'RENAME_PAGE',
  payload: page,
});

export const _expandPage = (id: string): PagesAction => ({
  type: 'EXPAND_PAGE',
  payload: id,
});

export const _collapsePage = (id: string): PagesAction => ({
  type: 'COLLAPSE_PAGE',
  payload: id,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const _toggleExpandPage = (id: string): PagesAction => ({
  type: 'TOGGLE_EXPAND_PAGE',
  payload: id,
});
