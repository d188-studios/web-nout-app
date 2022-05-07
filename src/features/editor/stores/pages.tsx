import React, { useCallback, useMemo } from 'react';
import {
  Page,
  PageCreateProps,
  PageInsertProps,
  PageRenameProps,
  PageUpdateProps,
} from '../types';

import { PageTree } from '../utils/PageTree';

export interface PagesState {
  pages: Page[];
  selectedPageId: string | null;
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
  | { type: 'COLLAPSE_PAGE'; payload: string }
  | { type: 'TOGGLE_EXPAND_PAGE'; payload: string }
  | { type: 'SELECT_PAGE'; payload: string | null };

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

export const renamePage = (page: PageRenameProps): PagesAction => ({
  type: 'RENAME_PAGE',
  payload: page,
});

export const expandPage = (id: string): PagesAction => ({
  type: 'EXPAND_PAGE',
  payload: id,
});

export const collapsePage = (id: string): PagesAction => ({
  type: 'COLLAPSE_PAGE',
  payload: id,
});

export const toggleExpandPage = (id: string): PagesAction => ({
  type: 'TOGGLE_EXPAND_PAGE',
  payload: id,
});

export const selectPage = (id: string | null): PagesAction => ({
  type: 'SELECT_PAGE',
  payload: id,
});

function reducer(state: PagesState, action: PagesAction): PagesState {
  const pageTree = new PageTree(JSON.parse(JSON.stringify(state.pages)));

  switch (action.type) {
    case 'INSERT_PAGE':
      const insertedPage = pageTree.insertPage(action.payload);
      if (insertedPage)
        return {
          ...state,
          selectedPageId: insertedPage.id,
          pages: pageTree.pages,
        };
      break;

    case 'CREATE_PAGE':
      const createdPage = pageTree.createPage(action.payload);
      if (createdPage)
        return {
          ...state,
          selectedPageId: createdPage.id,
          pages: pageTree.pages,
        };
      break;

    case 'UPDATE_PAGE':
      const updatedPage = pageTree.updatePage(action.payload);
      if (updatedPage) return { ...state, pages: pageTree.pages };
      break;

    case 'DELETE_PAGE':
      let selectedPageDeleted = false;

      if (state.selectedPageId !== null) {
        selectedPageDeleted = state.selectedPageId === action.payload;
        selectedPageDeleted =
          selectedPageDeleted ||
          pageTree.findPageInParent(action.payload, state.selectedPageId) !==
            null;
      }

      const deletedPage = pageTree.deletePage(action.payload);
      if (deletedPage) {
        return {
          ...state,
          selectedPageId: selectedPageDeleted ? null : state.selectedPageId,
          pages: pageTree.pages,
        };
      }
      break;

    case 'RENAME_PAGE':
      const renamedPage = pageTree.renamePage(
        action.payload.id,
        action.payload.title
      );
      if (renamedPage) return { ...state, pages: pageTree.pages };
      break;

    case 'EXPAND_PAGE':
      const expandedPage = pageTree.expandPage(action.payload);
      if (expandedPage) return { ...state, pages: pageTree.pages };
      break;

    case 'COLLAPSE_PAGE':
      const collapsedPage = pageTree.collapsePage(action.payload);
      if (collapsedPage) return { ...state, pages: pageTree.pages };
      break;

    case 'TOGGLE_EXPAND_PAGE':
      const toggledPage = pageTree.toggleExpandPage(action.payload);
      if (toggledPage) return { ...state, pages: pageTree.pages };
      break;

    case 'SELECT_PAGE':
      return { ...state, selectedPageId: action.payload };
  }

  return state;
}

export type PagesProviderValue = [
  PagesState & {
    selectedPage: Page | null;
    selectedPagePath: Page[];
  },
  React.Dispatch<PagesAction>
];

export const PagesContext = React.createContext<PagesProviderValue>([
  {
    pages: [],
    selectedPageId: null,
    selectedPage: null,
    selectedPagePath: [],
  },
  () => {},
]);

export function PagesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, {
    pages: [],
    selectedPageId: null,
  });
  const { pages, selectedPageId } = state;

  const findPage = useCallback(
    (id: string) => {
      const pageTree = new PageTree(pages);
      return pageTree.findPage(id);
    },
    [pages]
  );

  const selectedPage = useMemo(() => {
    if (!selectedPageId) return null;
    return findPage(selectedPageId);
  }, [selectedPageId, findPage]);

  const selectedPagePath = useMemo(() => {
    if (!selectedPage) return [];
    const pageTree = new PageTree(state.pages);
    return pageTree.getPagePath(selectedPage.id);
  }, [selectedPage, state.pages]);

  return (
    <PagesContext.Provider
      value={[
        {
          ...state,
          selectedPage,
          selectedPagePath,
        },
        dispatch,
      ]}
    >
      {children}
    </PagesContext.Provider>
  );
}

export function usePages() {
  const [state, dispatch] = React.useContext(PagesContext);

  return {
    ...state,
    dispatch,
  };
}
