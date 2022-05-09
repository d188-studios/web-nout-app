import { PagesAction, PagesState } from '../../types';
import { PageTree } from '../../utils/PageTree';

export function reducer(state: PagesState, action: PagesAction): PagesState {
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
          pages: pageTree.pages,
        };
      break;

    case 'CREATE_PAGE':
      const createdPage = pageTree.createPage(action.payload);
      if (createdPage)
        return {
          ...state,
          pages: pageTree.pages,
        };
      break;

    case 'UPDATE_PAGE':
      const updatedPage = pageTree.updatePage(action.payload);
      if (updatedPage) return { ...state, pages: pageTree.pages };
      break;

    case 'DELETE_PAGE':
      const deletedPage = pageTree.deletePage(action.payload);
      if (deletedPage) {
        return {
          ...state,
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
  }

  return state;
}