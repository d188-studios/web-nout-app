export type Page = {
  id: string;
  title: string;
  expanded?: boolean;
  children: Page[];
  parent: Page | null;
}
