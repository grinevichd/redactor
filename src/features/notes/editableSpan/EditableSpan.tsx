import React, { ChangeEvent, useState } from 'react';
import { NotesType, useCountDispatch } from '../../../context/noteContext';
import { CrudOperations } from '../../../context/CrudOperationsEnum';
import { hashtagsFounder } from '../../utils/hashtagsFounder/hashtagsFounder';
import style from './editableSpan.module.scss';
import s from '../../../styles/deleteButton/deleteBtn.module.scss';

export const EditableSpan = ({ note }: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(note.text);
  const dispatch = useCountDispatch();

  const editNote = (id: string) => {
    setEditMode((prevState) => {
      if (prevState) {
        console.log('Меняем');
        dispatch({
          type: CrudOperations.updateNote,
          payload: { text, id, tag: hashtagsFounder(text) || [] },
        });
      } else {
        console.log('Не меняем');
      }
      return !prevState;
    });
  };
  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const closeEditMode = (id: string) => {
    editNote(id);
  };
  return (
    <>
      {!editMode ? (
        <>
          <span className={style.text}>{note.text}</span>
          <button onClick={() => editNote(note.id)} className={s.btn}>
            <span className="material-symbols-outlined">edit</span>
          </button>
        </>
      ) : (
        <>
          <textarea
            className={style.textArea}
            onChange={onChangeHandler}
            autoFocus
            value={text}
            onBlur={() => closeEditMode(note.id)}
          />
          <button onClick={() => editNote(note.id)} className={s.btn}>
            <span className="material-symbols-outlined">add</span>
          </button>
        </>
      )}
      {/*<button onClick={() => editNote(note.id)}>edit</button>*/}
    </>
  );
};

type EditableSpanPropsType = {
  note: NotesType;
};
