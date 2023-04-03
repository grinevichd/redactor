import React from 'react';
import './App.scss';
import { CreateNote } from './features/createNote/CreateNote';
import { Notes } from './features/notes/Notes';
import { FilterNotes } from './features/filterNotes/FilterNotes';

function App() {
  return (
    <div className={'container'}>
      <CreateNote />
      <div className="App">
        <FilterNotes />
        <Notes />
      </div>
    </div>
  );
}

export default App;
