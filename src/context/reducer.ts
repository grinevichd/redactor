import { CrudOperations } from './CrudOperationsEnum';
import { initialStateType, NotesType } from './noteContext';
import { v4 as uuidv4 } from 'uuid';
import { currentHashes } from '../features/utils/currentHashes/currentHashes';

export const reducer = (state: initialStateType, action: ActionType): initialStateType => {
  switch (action.type) {
    case CrudOperations.createNote:
      const newNote: NotesType = {
        id: uuidv4(),
        text: action.payload?.text || '',
        tag: action.payload?.tag || [],
      };
      const cloneState = { notes: [...state.notes, newNote] };

      if (state.reserveNotesForFilter?.length) {
        cloneState.notes = [...state.reserveNotesForFilter, newNote];
      }
      const hashes = currentHashes(cloneState);
      return {
        ...cloneState,
        allHashes: hashes,
        reserveNotesForFilter: [...cloneState.notes],
      };
    case CrudOperations.updateNote: {
      debugger;
      const notes = {
        notes: state.notes.map((el) =>
          el.id === action.payload.id
            ? { ...el, text: action.payload.text || '', tag: action.payload?.tag || [] }
            : el,
        ),
      };

      const hashes = currentHashes(notes);

      return {
        ...notes,
        allHashes: [...hashes],
        reserveNotesForFilter: [...notes.notes],
      };
    }
    case CrudOperations.deleteNote: {
      const notes = state.notes.filter((el) => el.id !== action.payload.id);
      const hashes = currentHashes({ notes });
      let reserveNotesForFilter = [...state.notes];
      if (state.notes.length === 1) {
        reserveNotesForFilter = [];
      }

      return {
        notes: [...notes],
        allHashes: [...hashes],
        reserveNotesForFilter,
      };
    }
    case CrudOperations.deleteHash: {
      const correctTags: string[][] = [];
      const correctText: string[] = [];

      for (let i = 0; i < state.notes.length; i++) {
        const result = state.notes[i].tag?.filter((el) => el !== action.payload.hash);
        if (result) {
          correctTags.push(result);
        }
      }
      for (let i = 0; i < state.notes.length; i++) {
        const result = state.notes[i].text.replaceAll(`${action.payload.hash}`, '');
        correctText.push(result);
      }
      const newState: initialStateType = { notes: [], allHashes: [] };

      newState.notes = state.notes.map((n, index) => {
        return {
          id: n.id,
          tag: correctTags[index],
          text: correctText[index],
        };
      });

      newState.notes = newState.notes.filter((el) => el.text.length);
      newState.allHashes = state.allHashes?.filter((el) => el.hash !== action.payload.hash);
      newState.reserveNotesForFilter = [...state.notes];
      if (state.notes.length === 1) {
        newState.reserveNotesForFilter = [];
      }
      return newState;
    }
    case CrudOperations.filterHash: {
      let cloneState: NotesType[] = [];
      if (state.reserveNotesForFilter) {
        cloneState = [...state.reserveNotesForFilter];
      }

      const checked = action.payload.checked ? action.payload.checked : false;
      const allHashes = state.allHashes?.map((el) =>
        el.id === action.payload.id ? { ...el, checked } : el,
      );

      const selectedHashes = allHashes?.filter((el) => el.checked);

      let test = [];

      for (let i = 0; i < cloneState.length; i++) {
        for (let j = 0; j < cloneState[i].tag!.length; j++) {
          for (let k = 0; k < selectedHashes!.length; k++) {
            // @ts-ignore
            if (cloneState[i].tag[j] === cloneState[i]!.tag[j + 1]) {
              continue;
            }
            // @ts-ignore
            if (cloneState[i].tag[j] === selectedHashes![k].hash) {
              test.push(cloneState[i]);
            }
          }
        }
      }
      if (!selectedHashes?.length) {
        test = cloneState;
      }
      let reserveNotesForFilter;
      if (state.reserveNotesForFilter?.length) {
        reserveNotesForFilter = [...state.reserveNotesForFilter];
      }

      if (reserveNotesForFilter) {
        if (test.length > reserveNotesForFilter?.length) {
          test = reserveNotesForFilter;
        }
      }

      return {
        notes: test,
        allHashes,
        reserveNotesForFilter,
      };
    }
  }
  return state;
};

export type ActionType = { type: CrudOperations; payload: PayloadType };

type PayloadType = {
  id?: string;
  text?: string;
  tag?: string[];
  hash?: string;
  checked?: boolean;
};
