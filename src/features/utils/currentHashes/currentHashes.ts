import { initialStateType } from '../../../context/noteContext';
import { v4 as uuidv4 } from 'uuid';

export const currentHashes = (state: initialStateType) => {
  const allHashes: string[] = [];
  const result: string[] = [];
  state.notes.forEach((el) => el.tag?.forEach((tag) => allHashes.push(tag)));
  const unionParams = new Set(allHashes);
  for (const unionParam of unionParams) {
    result.push(unionParam);
  }
  return result.map((el) => ({ id: uuidv4(), hash: el, checked: false }));
};
