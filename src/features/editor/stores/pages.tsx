import React from 'react';
import {
  Page,
  PageCreateProps,
  PageInsertProps,
  PageRenameProps,
  PageUpdateProps,
} from '../types';

import { PageTree } from '../utils/PageTree';
import { useEventEmitter } from '~/lib/eventemitter';

const pageTree = new PageTree();

export interface PagesState {
  pages: Page[];
}

export type PagesAction =
  | { type: 'INSERT_PAGE'; payload: PageInsertProps }
  | { type: 'CREATE_PAGE'; payload: PageCreateProps }
  | { type: 'UPDATE_PAGE'; payload: PageUpdateProps }
  | { type: 'DELETE_PAGE'; payload: string }
  | {
      type: 'RENAME_PAGE';
      payload: PageRenameProps;
    }
  | { type: 'EXPAND_PAGE'; payload: string }
  | { type: 'COLLAPSE_PAGE'; payload: string };

export const insertPage = (page: PageInsertProps): PagesAction => ({
  type: 'INSERT_PAGE',
  payload: page,
});

export const createPage = (page: PageCreateProps): PagesAction => ({
  type: 'CREATE_PAGE',
  payload: page,
});

export const updatePage = (page: PageUpdateProps): PagesAction => ({
  type: 'UPDATE_PAGE',
  payload: page,
});

export const deletePage = (id: string): PagesAction => ({
  type: 'DELETE_PAGE',
  payload: id,
});

export const expandPage = (id: string): PagesAction => ({
  type: 'EXPAND_PAGE',
  payload: id,
});

export const collapsePage = (id: string): PagesAction => ({
  type: 'COLLAPSE_PAGE',
  payload: id,
});

function reducer(state: PagesState, action: PagesAction): PagesState {
  const newPages: Page[] = JSON.parse(JSON.stringify(state.pages));
  pageTree.pages = newPages;

  switch (action.type) {
    case 'INSERT_PAGE':
      const insertedPage = pageTree.insertPage(action.payload);
      if (insertedPage) return { ...state, pages: newPages };
      break;

    case 'CREATE_PAGE':
      const createdPage = pageTree.createPage(action.payload);
      if (createdPage) return { ...state, pages: newPages };
      break;

    case 'UPDATE_PAGE':
      const updatedPage = pageTree.updatePage(action.payload);
      if (updatedPage) return { ...state, pages: newPages };
      break;

    case 'DELETE_PAGE':
      const deletedPage = pageTree.deletePage(action.payload);
      if (deletedPage) return { ...state, pages: newPages };
      break;

    case 'RENAME_PAGE':
      const renamedPage = pageTree.renamePage(
        action.payload.id,
        action.payload.title
      );
      if (renamedPage) return { ...state, pages: newPages };
      break;

    case 'EXPAND_PAGE':
      const expandedPage = pageTree.expandPage(action.payload);
      if (expandedPage) return { ...state, pages: newPages };
      break;

    case 'COLLAPSE_PAGE':
      const collapsedPage = pageTree.collapsePage(action.payload);
      if (collapsedPage) return { ...state, pages: newPages };
      break;
  }

  return state;
}

export type PagesProviderValue = [PagesState, React.Dispatch<PagesAction>];

export const PagesContext = React.createContext<PagesProviderValue>([
  { pages: [] },
  () => {},
]);

// function getPagePath(page: Page | string, pages: Page[]): PagePath[] {
//   const path = utils.getPagePath(page, pages);
//   const pagePath: PagePath[] = [];
//   let children = pages;
//   for (let i = 0; i < path.length - 1; i++) {
//     const page = children[path[i]];
//     pagePath.push({
//       id: page.id,
//       title: page.title,
//     });
//     children = page.children;
//   }

//   return pagePath;
// }

export function PagesProvider({ children }: { children: React.ReactNode }) {
  const { addListener, emit } = useEventEmitter();

  // const [pages, setPages] = React.useState<Page[]>([]);

  const [state, dispatch] = React.useReducer(reducer, { pages: [] });

  // const openPageIdRef = React.useRef<string | null>(null);

  // const isOpenPage = useCallback(
  //   (page: Page) => {
  //     if (openPageIdRef.current === null) return false;

  //     if (page.id === openPageIdRef.current) return true;
  //   },
  //   []
  // );

  // const isOrContainsOpenPage = useCallback(
  //   (page: Page) => {
  //     if (openPageIdRef.current === null) return false;

  //     if (page.id === openPageIdRef.current) return true;

  //     return utils.pagesContain(openPageIdRef.current, page.children);
  //   },
  //   []
  // );

  // /**
  //  * Open a page
  //  */

  // useEffect(() => {
  //   return addListener<Page>('openPage', (page) => {
  //     openPageIdRef.current = page.id;

  //     emit('openPagePath', getPagePath(page, pages));
  //   });
  // }, [addListener, emit, pages]);

  // /**
  //  * Delete a page
  //  */

  // const deletePage = useCallback(
  //   (page: Page) => {
  //     setPages((pages) =>
  //       utils.deletePage(page, pages, (deletedPage, newPages) => {
  //         if (isOrContainsOpenPage(deletedPage)) {
  //           if (openPageIdRef.current !== null)
  //             emit('openPagePath', getPagePath(openPageIdRef.current, newPages));

  //           openPageIdRef.current = null;
  //           emit('deleteOpenPage', deletedPage);
  //         }
  //       })
  //     );
  //   },
  //   [emit, isOrContainsOpenPage]
  // );

  // useEffect(() => {
  //   return addListener<Page>('deletePage', deletePage);
  // }, [addListener, deletePage]);

  // /**
  //  * Update a page
  //  */

  // const updatePage = useCallback((page: Page, editedPage: EditablePage) => {
  //   setPages((pages) =>
  //     utils.updatePage(page, editedPage, pages, (updatedPage, newPages) => {
  //       if (isOpenPage(updatedPage)) {
  //         openPageIdRef.current = updatedPage.id;

  //         emit('updateOpenPage', updatedPage);
  //       }

  //       if (isOrContainsOpenPage(updatedPage) && openPageIdRef.current !== null)
  //         emit('openPagePath', getPagePath(openPageIdRef.current, newPages));
  //     })
  //   );
  // }, []);

  // useEffect(() => {
  //   return addListener<{
  //     page: Page;
  //     editedPage: EditablePage;
  //   }>('updatePage', ({ page, editedPage }) => updatePage(page, editedPage));
  // }, [addListener, updatePage]);

  // /**
  //  * Expand a page
  //  */

  // const expandPage = useCallback((page: Page) => {
  //   setPages((pages) => utils.updatePage(page, { expanded: true }, pages));
  // }, []);

  // useEffect(() => {
  //   return addListener<Page>('expandPage', expandPage);
  // }, [addListener, expandPage]);

  // /**
  //  * Collapse a page
  //  */

  // const collapsePage = useCallback((page: Page) => {
  //   setPages((pages) => utils.updatePage(page, { expanded: false }, pages));
  // }, []);

  // useEffect(() => {
  //   return addListener<Page>('collapsePage', collapsePage);
  // }, [addListener, collapsePage]);

  // /**
  //  * Toggle page expanded
  //  */

  // const togglePageExpanded = useCallback((page: Page) => {
  //   setPages((pages) =>
  //     utils.updatePage(page, { expanded: !page.expanded }, pages)
  //   );
  // }, []);

  // useEffect(() => {
  //   return addListener<Page>('togglePageExpanded', togglePageExpanded);
  // }, [addListener, togglePageExpanded]);

  // /**
  //  * Add a page
  //  */

  // const addPage = useCallback((page: Page | null, newPage: Page) => {
  //   setPages((pages) => utils.addChildrenToPage(page, newPage, pages));
  // }, []);

  // useEffect(() => {
  //   return addListener<{ page: Page; newPage: Page }>(
  //     'addPage',
  //     ({ page, newPage }) => addPage(page, newPage)
  //   );
  // }, [addListener, addPage]);

  return (
    <PagesContext.Provider value={[state, dispatch]}>
      {children}
    </PagesContext.Provider>
  );
}

export function useEditor() {
  return React.useContext(PagesContext);
}
