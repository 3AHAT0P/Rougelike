import { Cell } from '../entities/Cell';

export const getManhattanDistanceBetween = (from: Cell, to: Cell): number => {
  const D = 1;
  const dx = Math.abs(from.columnIndex - to.columnIndex);
  const dy = Math.abs(from.rowIndex - to.rowIndex);

  return D * (dx + dy);
};
