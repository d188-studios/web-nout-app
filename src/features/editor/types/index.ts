import { OutputBlockData } from '@editorjs/editorjs';

export type Page = {
  id: string;
  title: string;
  expanded?: boolean;
  parent: string | null;
  children: Page[];
};

export type PageInsertProps = Omit<Page, 'children'>;

export type PageCopyProps = {
  id: string;
  title: string;
  parent?: string;
};

export type PageCreateProps = {
  title?: string;
  parent?: string;
  expanded?: boolean;
};

export type PageUpdateProps = {
  id: string;
  title?: string;
  expanded?: boolean;
};

export type PageRenameProps = {
  title: string;
  id: string;
};

export type Position = {
  x: number;
  y: number;
};

export type Content = {
  id: string;
  pageId: string;
  content: OutputBlockData[];
};
export interface PagesState {
  pages: Page[];
  loading: boolean;
}

export type PagesAction =
  | { type: 'SET_PAGES'; payload: Page[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'INSERT_PAGE'; payload: PageInsertProps }
  | { type: 'CREATE_PAGE'; payload: PageCreateProps }
  | { type: 'UPDATE_PAGE'; payload: PageUpdateProps }
  | { type: 'DELETE_PAGE'; payload: string }
  | {
      type: 'RENAME_PAGE';
      payload: PageRenameProps;
    }
  | { type: 'EXPAND_PAGE'; payload: string }
  | { type: 'COLLAPSE_PAGE'; payload: string }
  | { type: 'TOGGLE_EXPAND_PAGE'; payload: string };
