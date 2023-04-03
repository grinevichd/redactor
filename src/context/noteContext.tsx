import { createContext, ReactNode, useContext, useReducer } from 'react';
import { ActionType, reducer } from './reducer';

const CountStateContext = createContext<initialStateType | undefined>(undefined);
const CountDispatchContext = createContext<DispatchType | undefined>(undefined);

const NotesContext = ({ children }: CountProviderProps) => {
  const initialState: initialStateType = {
    notes: [],
    allHashes: [],
    reserveNotesForFilter: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState as any);

  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>{children}</CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
};

function useCountState() {
  const context = useContext(CountStateContext);
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider');
  }
  return context;
}

function useCountDispatch() {
  const context = useContext(CountDispatchContext);
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider');
  }
  return context;
}

export { NotesContext, useCountState, useCountDispatch };
export type initialStateType = {
  notes: NotesType[];
  allHashes?: AllHashesType[];
  reserveNotesForFilter?: NotesType[];
};

export type NotesType = {
  id: string;
  text: string;
  tag?: string[];
};
export type AllHashesType = {
  id: string;
  hash: string;
  checked: boolean;
};
type CountProviderProps = { children: ReactNode };
type DispatchType = (action: ActionType) => void;
