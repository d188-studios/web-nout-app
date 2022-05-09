import React from 'react';
import { PagesAction, PagesState } from '../../types';
import { reducer } from './reducer';

export type PagesProviderValue = [PagesState, React.Dispatch<PagesAction>];

export const PagesContext = React.createContext<PagesProviderValue>([
  {
    pages: [],
    loading: true,
  },
  () => {},
]);

export function PagesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, {
    pages: [],
    loading: true,
  });

  return (
    <PagesContext.Provider value={[state, dispatch]}>
      {children}
    </PagesContext.Provider>
  );
}
