import { OutputBlockData } from '@editorjs/editorjs';

export type Page = {
  id: string;
  title: string;
  expanded?: boolean;
  parent: string | null;
  children: Page[];
};

export type PageInsertProps = Omit<Page, 'children'>;

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
}