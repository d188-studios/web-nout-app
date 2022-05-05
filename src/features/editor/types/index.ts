export type Page = {
  id: string;
  title: string;
  expanded?: boolean;
  children: Page[];
};

export type EditablePage = {
  id?: string;
  title?: string;
  expanded?: boolean;
};

export type Position = {
  x: number;
  y: number;
};
