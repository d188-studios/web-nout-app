import { EventEmitter } from 'eventemitter3';
import React, { useCallback, useRef } from 'react';
import { Page, Position } from '../types';

import * as utils from '../utils';

export interface EditorState {
  pages: Page[];
  selectedPage: Page | null;
}

export interface EditorProviderValue extends EditorState {
  setSelectedPage: (page: Page | null) => void;
  deletePage: (page: Page | string) => void;
  updatePage: (
    page: Page | string,
    newPage: {
      id?: string;
      title?: string;
      expanded?: boolean;
    }
  ) => void;
  addPage: (page: Page | string | null, newPage: Page[] | Page) => void;
  openPageContextMenu: (page: Page, position: Position) => void;
  addOpenPageContextMenuListener: (
    onOpenPageContextMenu: (page: Page, position: Position) => void
  ) => void;
}

export const EditorContext = React.createContext<EditorProviderValue>({
  pages: [],
  selectedPage: null,
  setSelectedPage: () => {},
  deletePage: () => {},
  updatePage: () => {},
  addPage: () => {},
  openPageContextMenu: () => {},
  addOpenPageContextMenuListener: () => {},
});

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const eventEmitter = useRef(new EventEmitter()).current;

  const [pages, setPages] = React.useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = React.useState<Page | null>(null);

  const isSelectedPage = (page: Page | string) => {
    if (selectedPage === null) return false;

    return typeof page === 'string'
      ? page === selectedPage.id
      : page.id === selectedPage.id;
  };

  const openPageContextMenu = (page: Page, position: Position) => {
    eventEmitter.emit('openPageContextMenu', {
      page,
      position,
    });
  };

  const addOpenPageContextMenuListener = useCallback(
    (onOpenPageContextMenu: (page: Page, position: Position) => void) => {
      const l = (e: { page: Page; position: Position }) =>
        onOpenPageContextMenu(e.page, e.position);

      eventEmitter.on('openPageContextMenu', l);

      return () => {
        eventEmitter.off('openPageContextMenu', l);
      };
    },
    [eventEmitter]
  );

  const deletePage = (page: Page | string) => {
    if (isSelectedPage(page)) setSelectedPage(null);

    setPages((pages) => utils.deletePage(page, pages));
  };

  const updatePage = (
    page: Page | string,
    newPage: {
      id?: string;
      title?: string;
      expanded?: boolean;
    }
  ) => {
    if (isSelectedPage(page) && selectedPage !== null) {
      const newSelectedPage = {
        ...selectedPage,
      };

      if (newPage.id !== undefined) newSelectedPage.id = newPage.id;
      if (newPage.title !== undefined) newSelectedPage.title = newPage.title;
      if (newPage.expanded !== undefined)
        newSelectedPage.expanded = newPage.expanded;

      setSelectedPage(newSelectedPage);
    }

    setPages((pages) => utils.updatePage(page, newPage, pages));
  };

  const addPage = (page: Page | string | null, newPage: Page[] | Page) => {
    setPages((pages) => utils.addChildrenToPage(page, newPage, pages));
  };

  return (
    <EditorContext.Provider
      value={{
        pages,
        selectedPage,
        setSelectedPage,
        deletePage,
        updatePage,
        addPage,
        openPageContextMenu,
        addOpenPageContextMenuListener,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  return React.useContext(EditorContext);
}
