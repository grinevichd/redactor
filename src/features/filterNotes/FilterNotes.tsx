import React, { ChangeEvent } from 'react';
import { useCountDispatch, useCountState } from '../../context/noteContext';
import { CrudOperations } from '../../context/CrudOperationsEnum';
import style from './filterNotes.module.scss';
import s from '../../styles/deleteButton/deleteBtn.module.scss';

export const FilterNotes = () => {
  const dispatch = useCountDispatch();
  const hashes = useCountState().allHashes;
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, id: string, hash: string) => {
    dispatch({ type: CrudOperations.filterHash, payload: { id, hash, checked: e.target.checked } });
  };
  const deleteFilter = (hash: string) => {
    dispatch({ type: CrudOperations.deleteHash, payload: { hash } });
  };

  return (
    <div>
      {hashes?.map((el) => (
        <div className={style.container}>
          <input
            type={'checkbox'}
            onChange={(e) => onChangeHandler(e, el.id, el.hash)}
            checked={el.checked}
          />
          <span className={style.spanView}>{el.hash}</span>
          <button onClick={() => deleteFilter(el.hash)} className={s.btn}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      ))}
    </div>
  );
};
