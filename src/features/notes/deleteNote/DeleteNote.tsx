import React from 'react';
import { useCountDispatch } from '../../../context/noteContext';
import { CrudOperations } from '../../../context/CrudOperationsEnum';
import s from '../../../styles/deleteButton/deleteBtn.module.scss';

export const DeleteNote = ({ id }: { id: string }) => {
  const dispatch = useCountDispatch();

  const deleteNote = (noteID: string) => {
    dispatch({ type: CrudOperations.deleteNote, payload: { id: noteID } });
  };

  return (
    <>
      <button onClick={() => deleteNote(id)} className={s.btn}>
        <span className="material-symbols-outlined">delete</span>
      </button>
    </>
  );
};
