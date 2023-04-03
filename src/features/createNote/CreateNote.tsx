import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useCountDispatch } from '../../context/noteContext';
import { CrudOperations } from '../../context/CrudOperationsEnum';
import { hashtagsFounder } from '../utils/hashtagsFounder/hashtagsFounder';

import style from './createNote.module.scss';
import s from '../../styles/deleteButton/deleteBtn.module.scss';

export const CreateNote = () => {
  const dispatch = useCountDispatch();
  const [text, setText] = useState('');

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const addNote = () => {
    if (!text) return;

    dispatch({
      type: CrudOperations.createNote,
      payload: { text: text, tag: hashtagsFounder(text) || [] },
    });

    setText('');
  };
  const onkeydownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      addNote();
    }
  };

  return (
    <>
      <div className={style.container}>
        <textarea value={text} onChange={onChangeHandler} onKeyDown={onkeydownHandler} />
        <button onClick={addNote} className={s.btn}>
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </>
  );
};
