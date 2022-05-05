/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { EditablePage, Page } from '../types';

import * as utils from '../utils';
import { useEventEmitter } from '~/lib/eventemitter';

export interface EditorState {
  pages: Page[];
}

export interface EditorProviderValue extends EditorState {}

export const EditorContext = React.createContext<EditorProviderValue>({
  pages: [],
});

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const { addListener, emit } = useEventEmitter();

  const [pages, setPages] = React.useState<Page[]>([]);
  const openPageIdRef = React.useRef<string | null>(null);

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
    });
  }, [addListener]);

  /**
   * Delete a page
   */

  const deletePage = useCallback(
    (page: Page) => {
      setPages((pages) =>
        utils.deletePage(page, pages, (deletedPage) => {
          if (isOrContainsOpenPage(deletedPage)) {
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

  const updatePage = useCallback(
    (page: Page | string, editedPage: EditablePage) => {
      setPages((pages) =>
        utils.updatePage(page, editedPage, pages, (updatedPage) => {
          if (isOrContainsOpenPage(updatedPage)) {
            openPageIdRef.current = updatedPage.id;
            emit('updateOpenPage', updatedPage);
          }
        })
      );
    },
    []
  );

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

  useEffect(() => {
    return addListener<Page>('addRootPage', (page) => addPage(null, page));
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
