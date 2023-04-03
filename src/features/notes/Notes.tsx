import React from 'react';
import { useCountState } from '../../context/noteContext';
import { EditableSpan } from './editableSpan/EditableSpan';
import { DeleteNote } from './deleteNote/DeleteNote';
import style from './notes.module.scss';

export const Notes = () => {
  const state = useCountState();
  console.log(state);
  return (
    <div>
      {state.notes.map((note) => (
        <div key={note.id} className={style.container}>
          <DeleteNote id={note.id} />
          <EditableSpan note={note} />
        </div>
      ))}
    </div>
  );
};
