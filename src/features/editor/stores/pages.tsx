import React, { useCallback, useMemo } from 'react';
import { axios } from '~/lib/axios';
import { Either } from '~/utils/Either';
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
  loading: boolean;
  selectedPageId: string | null;
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
  | { type: 'TOGGLE_EXPAND_PAGE'; payload: string }
  | { type: 'SELECT_PAGE'; payload: string | null };

const _setPages = (pages: Page[]): PagesAction => ({
  type: 'SET_PAGES',
  payload: pages,
});

const _setLoading = (loading: boolean): PagesAction => ({
  type: 'SET_LOADING',
  payload: loading,
});

const _insertPage = (page: PageInsertProps): PagesAction => ({
  type: 'INSERT_PAGE',
  payload: page,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _createPage = (page: PageCreateProps): PagesAction => ({
  type: 'CREATE_PAGE',
  payload: page,
});

export const updatePage = (page: PageUpdateProps): PagesAction => ({
  type: 'UPDATE_PAGE',
  payload: page,
});

const _deletePage = (id: string): PagesAction => ({
  type: 'DELETE_PAGE',
  payload: id,
});

const _renamePage = (page: PageRenameProps): PagesAction => ({
  type: 'RENAME_PAGE',
  payload: page,
});

const _expandPage = (id: string): PagesAction => ({
  type: 'EXPAND_PAGE',
  payload: id,
});

const _collapsePage = (id: string): PagesAction => ({
  type: 'COLLAPSE_PAGE',
  payload: id,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _toggleExpandPage = (id: string): PagesAction => ({
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
    case 'SET_PAGES':
      return {
        ...state,
        pages: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

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
    fetchPages: () => Promise<Either<Error, Page[]>>;
    deletePage: (id: string) => Promise<Either<Error, string>>;
    createPage: (page: PageCreateProps) => Promise<Either<Error, Page>>;
    renamePage: (page: PageRenameProps) => Promise<Either<Error, Page>>;
    expandPage: (id: string) => Promise<Either<Error, Page>>;
    collapsePage: (id: string) => Promise<Either<Error, Page>>;
  },
  React.Dispatch<PagesAction>
];

export const PagesContext = React.createContext<PagesProviderValue>([
  {
    pages: [],
    loading: true,
    selectedPageId: null,
    selectedPage: null,
    selectedPagePath: [],
    fetchPages: () => Promise.resolve(Either.right([])),
    deletePage: () => Promise.resolve(Either.right('')),
    createPage: () =>
      Promise.resolve(
        Either.right({
          id: '',
          title: '',
          parent: null,
          children: [],
        })
      ),
    renamePage: () =>
      Promise.resolve(
        Either.right({
          id: '',
          title: '',
          parent: null,
          children: [],
        })
      ),
    expandPage: () =>
      Promise.resolve(
        Either.right({
          id: '',
          title: '',
          parent: null,
          children: [],
        })
      ),
    collapsePage: () =>
      Promise.resolve(
        Either.right({
          id: '',
          title: '',
          parent: null,
          children: [],
        })
      ),
  },
  () => {},
]);

export function PagesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, {
    pages: [],
    selectedPageId: null,
    loading: true,
  });
  const { pages, selectedPageId } = state;
  const pagesRef = React.useRef(pages);

  if (pagesRef.current !== pages) pagesRef.current = pages;

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

  const fetchPages = useCallback(async () => {
    try {
      dispatch(_setLoading(true));
      const res = await axios.get<Page[]>('/pages');

      const pages = res.data;

      dispatch(_setLoading(false));
      dispatch(_setPages(res.data));

      return Either.right<Error, Page[]>(pages);
    } catch {
      dispatch(_setLoading(false));

      return Either.left<Error, Page[]>(
        new Error('Ha ocurrido un error al cargar las páginas')
      );
    }
  }, []);

  const expandPage = useCallback(async (id: string) => {
    try {
      // Expand page even if request fails.
      dispatch(_expandPage(id));

      const res = await axios.put<Page>(`/pages/${id}`, {
        expanded: true,
      });

      return Either.right<Error, Page>(res.data);
    } catch {
      return Either.left<Error, Page>(
        new Error('Ha ocurrido un error al expandir la página.')
      );
    }
  }, []);

  const collapsePage = useCallback(async (id: string) => {
    try {
      // Collapse page even if request fails.
      dispatch(_collapsePage(id));

      const res = await axios.put<Page>(`/pages/${id}`, {
        expanded: false,
      });

      return Either.right<Error, Page>(res.data);
    } catch {
      return Either.left<Error, Page>(
        new Error('Ha ocurrido un error al colapsar la página.')
      );
    }
  }, []);

  const createPage = useCallback(
    async (page: PageCreateProps) => {
      try {
        const res = await axios.post<Page>('/pages', page);
        const newPage = res.data;

        // !! Kind of a hacky way to update expanded pages in server.

        const pageTree = new PageTree(
          JSON.parse(JSON.stringify(pagesRef.current))
        );
        pageTree.insertPage(newPage);

        const path = pageTree.getPagePath(newPage.id);
        for (let i = 0; i < path.length; i++) {
          if (i === path.length - 1) break;

          const page = path[i];
          expandPage(page.id);
        }

        // !! End of hack.

        dispatch(_insertPage(newPage));

        return Either.right<Error, Page>(newPage);
      } catch {
        return Either.left<Error, Page>(
          new Error('Ha ocurrido un error al crear la página')
        );
      }
    },
    [expandPage]
  );

  const deletePage = useCallback(async (id: string) => {
    try {
      await axios.delete<void>(`/pages/${id}`);

      dispatch(_deletePage(id));

      return Either.right<Error, string>(id);
    } catch {
      return Either.left<Error, string>(
        new Error('Ha ocurrido un error al eliminar la página.')
      );
    }
  }, []);

  const renamePage = useCallback(async (page: PageRenameProps) => {
    try {
      const res = await axios.put<Page>(`/pages/${page.id}`, {
        title: page.title,
      });

      dispatch(_renamePage(page));

      return Either.right<Error, Page>(res.data);
    } catch {
      return Either.left<Error, Page>(
        new Error('Ha ocurrido un error al renombrar la página.')
      );
    }
  }, []);

  return (
    <PagesContext.Provider
      value={[
        {
          ...state,
          selectedPage,
          selectedPagePath,
          fetchPages,
          deletePage,
          createPage,
          renamePage,
          expandPage,
          collapsePage,
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
