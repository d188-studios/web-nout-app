/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { EditablePage, Page, PagePath } from '../types';

import * as utils from '../utils';
import { useEventEmitter } from '~/lib/eventemitter';

export interface EditorState {
  pages: Page[];
}

export interface EditorProviderValue extends EditorState {}

export const EditorContext = React.createContext<EditorProviderValue>({
  pages: [],
});

function getPagePath(page: Page | string, pages: Page[]): PagePath[] {
  const path = utils.getPagePath(page, pages);
  const pagePath: PagePath[] = [];
  let children = pages;
  for (let i = 0; i < path.length - 1; i++) {
    const page = children[path[i]];
    pagePath.push({
      id: page.id,
      title: page.title,
    });
    children = page.children;
  }

  return pagePath;
}

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const { addListener, emit } = useEventEmitter();

  const [pages, setPages] = React.useState<Page[]>([]);
  const openPageIdRef = React.useRef<string | null>(null);

  const isOpenPage = useCallback(
    (page: Page) => {
      if (openPageIdRef.current === null) return false;

      if (page.id === openPageIdRef.current) return true;
    },
    [pages]
  );

  const isOrContainsOpenPage = useCallback(
    (page: Page) => {
      if (openPageIdRef.current === null) return false;

      if (page.id === openPageIdRef.current) return true;

      return utils.pagesContain(openPageIdRef.current, page.children);
    },
    [pages]
  );

  /**
   * Open a page
   */

  useEffect(() => {
    return addListener<Page>('openPage', (page) => {
      openPageIdRef.current = page.id;

      emit('openPagePath', getPagePath(page, pages));
    });
  }, [addListener, pages]);

  /**
   * Delete a page
   */

  const deletePage = useCallback(
    (page: Page) => {
      setPages((pages) =>
        utils.deletePage(page, pages, (deletedPage, newPages) => {
          if (isOrContainsOpenPage(deletedPage)) {
            if (openPageIdRef.current !== null)
              emit('openPagePath', getPagePath(openPageIdRef.current, newPages));

            openPageIdRef.current = null;
            emit('deleteOpenPage', deletedPage);
          }
        })
      );
    },
    [emit, isOrContainsOpenPage]
  );

  useEffect(() => {
    return addListener<Page>('deletePage', deletePage);
  }, [addListener, deletePage]);

  /**
   * Update a page
   */

  const updatePage = useCallback((page: Page, editedPage: EditablePage) => {
    setPages((pages) =>
      utils.updatePage(page, editedPage, pages, (updatedPage, newPages) => {
        if (isOpenPage(updatedPage)) {
          openPageIdRef.current = updatedPage.id;

          emit('updateOpenPage', updatedPage);
        }

        if (isOrContainsOpenPage(updatedPage) && openPageIdRef.current !== null)
          emit('openPagePath', getPagePath(openPageIdRef.current, newPages));
      })
    );
  }, []);

  useEffect(() => {
    return addListener<{
      page: Page;
      editedPage: EditablePage;
    }>('updatePage', ({ page, editedPage }) => updatePage(page, editedPage));
  }, [addListener, updatePage]);

  /**
   * Expand a page
   */

  const expandPage = useCallback((page: Page) => {
    setPages((pages) => utils.updatePage(page, { expanded: true }, pages));
  }, []);

  useEffect(() => {
    return addListener<Page>('expandPage', expandPage);
  }, [addListener, expandPage]);

  /**
   * Collapse a page
   */

  const collapsePage = useCallback((page: Page) => {
    setPages((pages) => utils.updatePage(page, { expanded: false }, pages));
  }, []);

  useEffect(() => {
    return addListener<Page>('collapsePage', collapsePage);
  }, [addListener, collapsePage]);

  /**
   * Toggle page expanded
   */

  const togglePageExpanded = useCallback((page: Page) => {
    setPages((pages) =>
      utils.updatePage(page, { expanded: !page.expanded }, pages)
    );
  }, []);

  useEffect(() => {
    return addListener<Page>('togglePageExpanded', togglePageExpanded);
  }, [addListener, togglePageExpanded]);

  /**
   * Add a page
   */

  const addPage = useCallback((page: Page | null, newPage: Page) => {
    setPages((pages) => utils.addChildrenToPage(page, newPage, pages));
  }, []);

  useEffect(() => {
    return addListener<{ page: Page; newPage: Page }>(
      'addPage',
      ({ page, newPage }) => addPage(page, newPage)
    );
  }, [addListener, addPage]);

  return (
    <EditorContext.Provider
      value={{
        pages,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  return React.useContext(EditorContext);
}
