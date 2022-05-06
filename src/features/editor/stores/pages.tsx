import React, { useCallback } from 'react';
import {
  Page,
  PageCreateProps,
  PageInsertProps,
  PageRenameProps,
  PageUpdateProps,
} from '../types';

import { PageTree } from '../utils/PageTree';
import { useEventEmitter } from '~/lib/eventemitter';

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
  | { type: 'COLLAPSE_PAGE'; payload: string }
  | { type: 'TOGGLE_EXPAND_PAGE'; payload: string };

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

function reducer(state: PagesState, action: PagesAction): PagesState {
  const pageTree = new PageTree(JSON.parse(JSON.stringify(state.pages)));

  switch (action.type) {
    case 'INSERT_PAGE':
      const insertedPage = pageTree.insertPage(action.payload);
      if (insertedPage) return { ...state, pages: pageTree.pages };
      break;

    case 'CREATE_PAGE':
      const createdPage = pageTree.createPage(action.payload);
      if (createdPage) return { ...state, pages: pageTree.pages };
      break;

    case 'UPDATE_PAGE':
      const updatedPage = pageTree.updatePage(action.payload);
      if (updatedPage) return { ...state, pages: pageTree.pages };
      break;

    case 'DELETE_PAGE':
      const deletedPage = pageTree.deletePage(action.payload);
      if (deletedPage) return { ...state, pages: pageTree.pages };
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
  }

  return state;
}

export type PagesProviderValue = [
  PagesState & {
    findPage: (id: string) => Page | null;
  },
  React.Dispatch<PagesAction>
];

export const PagesContext = React.createContext<PagesProviderValue>([
  { pages: [], findPage: (id: string) => null },
  () => {},
]);

export function PagesProvider({ children }: { children: React.ReactNode }) {
  const { addListener, emit } = useEventEmitter();

  const [state, dispatch] = React.useReducer(reducer, { pages: [] });

  const findPage = useCallback(
    (id: string) => {
      const pageTree = new PageTree(state.pages);
      return pageTree.findPage(id);
    },
    [state.pages]
  );

  return (
    <PagesContext.Provider
      value={[
        {
          ...state,
          findPage,
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
