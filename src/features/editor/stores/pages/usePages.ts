import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { webNout } from '~/lib/webNout';
import { Either } from '~/utils/Either';
import { PagesContext } from './context';
import {
  Page,
  PageCopyProps,
  PageCreateProps,
  PageRenameProps,
} from '../../types';
import { PageTree } from '../../utils/PageTree';
import {
  _collapsePage,
  _deletePage,
  _expandPage,
  _insertPage,
  _renamePage,
  _setLoading,
  _setPages,
} from './actions';

export function usePages() {
  const navigate = useNavigate();
  const { selectedPageId } = useParams();

  const [state, dispatch] = React.useContext(PagesContext);

  const { pages } = state;
  const pagesRef = React.useRef(pages);

  if (pagesRef.current !== pages) pagesRef.current = pages;

  const findPage = useCallback(
    (id: string) => {
      const pageTree = new PageTree(pages);
      return pageTree.findPage(id);
    },
    [pages]
  );

  const getPagePath = useCallback(
    (id: string) => {
      const pageTree = new PageTree(pages);
      return pageTree.getPagePath(id);
    },
    [pages]
  );

  const fetchPages = useCallback(async () => {
    try {
      dispatch(_setLoading(true));
      const res = await webNout.get<Page[]>('/pages');

      const pages = res.data;

      dispatch(_setLoading(false));
      dispatch(_setPages(res.data));

      return Either.right<Error, Page[]>(pages);
    } catch {
      dispatch(_setLoading(false));

      return Either.left<Error, Page[]>(
        new Error('Ha ocurrido un error al cargar las páginas.')
      );
    }
  }, [dispatch]);

  const expandPage = useCallback(
    async (id: string) => {
      try {
        // Expand page even if request fails.
        dispatch(_expandPage(id));

        const res = await webNout.put<Page>(`/pages/${id}`, {
          expanded: true,
        });

        return Either.right<Error, Page>(res.data);
      } catch {
        return Either.left<Error, Page>(
          new Error('Ha ocurrido un error al expandir la página.')
        );
      }
    },
    [dispatch]
  );

  const collapsePage = useCallback(
    async (id: string) => {
      try {
        // Collapse page even if request fails.
        dispatch(_collapsePage(id));

        const res = await webNout.put<Page>(`/pages/${id}`, {
          expanded: false,
        });

        return Either.right<Error, Page>(res.data);
      } catch {
        return Either.left<Error, Page>(
          new Error('Ha ocurrido un error al colapsar la página.')
        );
      }
    },
    [dispatch]
  );

  const expandPagePathSync = useCallback(
    (id: string, pageTree: PageTree) => {
      const path = pageTree.getPagePath(id);
      for (let i = 0; i < path.length; i++) {
        if (i === path.length - 1) break;

        const page = path[i];
        expandPage(page.id);
      }
    },
    [expandPage]
  );

  const createPage = useCallback(
    async (page: PageCreateProps) => {
      try {
        const res = await webNout.post<Page>('/pages', page);
        const newPage = res.data;

        // !! Kind of a hacky way to update expanded pages in server.

        const pageTree = new PageTree(
          JSON.parse(JSON.stringify(pagesRef.current))
        );
        pageTree.insertPage(newPage);

        expandPagePathSync(newPage.id, pageTree);

        // !! End of hack.

        dispatch(_insertPage(newPage));
        navigate(`/${newPage.id}`);

        return Either.right<Error, Page>(newPage);
      } catch {
        return Either.left<Error, Page>(
          new Error('Ha ocurrido un error al crear la página.')
        );
      }
    },
    [dispatch, expandPagePathSync, navigate]
  );

  const copyPage = useCallback(
    async (page: PageCopyProps) => {
      try {
        const res = await webNout.post<Page>('/pages/copy', page);
        const newPage = res.data;

        // !! Kind of a hacky way to update expanded pages in server.

        const pageTree = new PageTree(
          JSON.parse(JSON.stringify(pagesRef.current))
        );
        pageTree.insertPage(newPage);

        expandPagePathSync(newPage.id, pageTree);

        // !! End of hack.

        dispatch(_insertPage(newPage));
        navigate(`/${newPage.id}`);

        return Either.right<Error, Page>(newPage);
      } catch {
        return Either.left<Error, Page>(
          new Error('Ha ocurrido un error al copiar la página.')
        );
      }
    },
    [dispatch, expandPagePathSync, navigate]
  );

  const deletePage = useCallback(
    async (id: string) => {
      try {
        await webNout.delete<void>(`/pages/${id}`);

        const pageTree = new PageTree(
          JSON.parse(JSON.stringify(pagesRef.current))
        );

        if (selectedPageId !== undefined) {
          const selectedPageDeleted =
            selectedPageId === id ||
            pageTree.findPageInParent(id, selectedPageId) !== null;

          if (selectedPageDeleted) navigate('/');
        }

        dispatch(_deletePage(id));

        return Either.right<Error, string>(id);
      } catch {
        return Either.left<Error, string>(
          new Error('Ha ocurrido un error al eliminar la página.')
        );
      }
    },
    [dispatch, navigate, selectedPageId]
  );

  const renamePage = useCallback(
    async (page: PageRenameProps) => {
      try {
        const res = await webNout.put<Page>(`/pages/${page.id}`, {
          title: page.title,
        });

        dispatch(_renamePage(page));

        return Either.right<Error, Page>(res.data);
      } catch {
        return Either.left<Error, Page>(
          new Error('Ha ocurrido un error al renombrar la página.')
        );
      }
    },
    [dispatch]
  );

  return {
    ...state,
    dispatch,
    findPage,
    getPagePath,
    fetchPages,
    deletePage,
    createPage,
    renamePage,
    expandPage,
    collapsePage,
    copyPage,
  };
}
