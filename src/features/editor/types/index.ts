export type Page = {
  id: string;
  title: string;
  expanded?: boolean;
  parent?: string;
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

export interface PagePath {
  title: string;
  id: string;
}

export type EditablePage = {
  id?: string;
  title?: string;
  expanded?: boolean;
  parent?: string;
};

export type Position = {
  x: number;
  y: number;
};
