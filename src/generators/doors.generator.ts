import { CellList } from '../CellList';
import { Cell } from '../entities/Cell';
import { Door } from '../entities/Door';
import { getManhattanDistanceBetween } from '../utils/getManhattanDistanceBetween';
import { getRandomInt } from '../utils/getRandomInt';

const compareCellBy = (direction: 'X' | 'Y', cellA: Cell, cellB: Cell) => {
  if (direction === 'X') {
    if (cellA.columnIndex === cellB.columnIndex) return 0;
    if (cellA.columnIndex > cellB.columnIndex) return -1;
    return 1;
  } else if (direction === 'Y') {
    if (cellA.rowIndex === cellB.rowIndex) return 0;
    if (cellA.rowIndex > cellB.rowIndex) return -1;
    return 1;
  }

  throw new Error('Direction is not valid');
};

type Direction = [dx: -1 | 0 | 1, dy: -1 | 0 | 1];

const getDirection = (from: Cell, to: Cell): Direction => {
  if (from.columnIndex === to.columnIndex) {
    if (from.rowIndex === to.rowIndex) return [0, 0];
    if (from.rowIndex > to.rowIndex) return [0, -1];
    if (from.rowIndex < to.rowIndex) return [0, 1];
  }
  if (from.columnIndex > to.columnIndex) return [-1, 0];
  if (from.columnIndex < to.columnIndex) return [1, 0];
  throw new Error('Something went wrong');
};

const generatePathBetween = (
  doors: Door[],
  cellList: CellList,
  from: Cell,
  to: Cell
) => {
  let currentCell = from;
  let direction: Direction = getDirection(from, to);

  console.log('direction', direction);

  while (true) {
    const nextCell = cellList.getCellByPoint(
      currentCell.columnIndex + direction[0],
      currentCell.rowIndex + direction[1]
    );

    const door = doors.find(({ from, to }) => {
      return (
        (from === currentCell && to === nextCell) ||
        (from === nextCell && to === currentCell)
      );
    });

    if (door == null) {
      doors.push({ from: currentCell, to: nextCell });
    }

    if (nextCell === to) break;

    currentCell = nextCell;
    direction = getDirection(currentCell, to);
  }
};

const g = (
  doors: Door[],
  cellList: CellList,
  startCell: Cell,
  iterationNumber: number,
  finishCell: Cell
): [distance: number, cell: Cell] => {
  const stack: Cell[] = [startCell];

  const nearestToFinishCell: Array<[distance: number, cell: Cell]> = [];

  while (iterationNumber > 0) {
    const cell = stack.pop();
    if (cell == null) break;
    const nearestCells = cellList.getNearestCellsOfPoint(
      cell.columnIndex,
      cell.rowIndex
    );
    const nextCell = nearestCells[getRandomInt(0, nearestCells.length)];

    const door = doors.find(({ from, to }) => {
      return (
        (from === cell && to === nextCell) || (from === nextCell && to === cell)
      );
    });
    stack.push(nextCell);

    if (door != null) {
      continue;
    }

    nearestToFinishCell.push([
      getManhattanDistanceBetween(nextCell, finishCell),
      nextCell,
    ]);
    doors.push({ from: cell, to: nextCell });
    iterationNumber -= 1;
  }

  nearestToFinishCell.sort((a, b) =>
    a[0] > b[0] ? 1 : a[0] === b[0] ? 0 : -1
  );

  return nearestToFinishCell[0];
};

// Doors count for square
// 1x1 = 0
// 2x2 = 4
// 3x3 = 12 = 4 - 2 * 3 * 2
// nxn = (n + 1 - 2) * n * 2

export const generateDoors = (cellList: CellList): Door[] => {
  const doors: Door[] = [];

  const startCell = cellList.getStartCell();
  const endCell = cellList.getEndCell();

  const x = g(doors, cellList, startCell, 25, endCell);

  // g(
  //   doors,
  //   cellList,
  //   cellList.getCellByPoint(7, 2),
  //   15,
  //   cellList.getCellByPoint(2, 7)
  // );
  // g(
  //   doors,
  //   cellList,
  //   cellList.getCellByPoint(2, 7),
  //   15,
  //   cellList.getCellByPoint(7, 2)
  // );

  const y = g(doors, cellList, endCell, 25, x[1]);

  g(doors, cellList, x[1], 5, y[1]);

  // g(
  //   doors,
  //   cellList,
  //   cellList.getCellByPoint(4, 5),
  //   20,
  //   cellList.getCellByPoint(5, 4)
  // );

  generatePathBetween(
    doors,
    cellList,
    cellList.getCellByPoint(1, 1),
    cellList.getCellByPoint(1, 12)
  );

  generatePathBetween(
    doors,
    cellList,
    cellList.getCellByPoint(1, 12),
    cellList.getCellByPoint(12, 12)
  );

  generatePathBetween(
    doors,
    cellList,
    cellList.getCellByPoint(12, 12),
    cellList.getCellByPoint(12, 2)
  );

  generatePathBetween(
    doors,
    cellList,
    cellList.getCellByPoint(12, 2),
    cellList.getCellByPoint(2, 2)
  );
  generatePathBetween(
    doors,
    cellList,
    cellList.getCellByPoint(2, 2),
    cellList.getCellByPoint(2, 11)
  );

  generatePathBetween(
    doors,
    cellList,
    cellList.getCellByPoint(2, 11),
    cellList.getCellByPoint(11, 11)
  );

  generatePathBetween(
    doors,
    cellList,
    cellList.getCellByPoint(11, 11),
    cellList.getCellByPoint(11, 3)
  );

  generatePathBetween(
    doors,
    cellList,
    cellList.getCellByPoint(11, 3),
    cellList.getCellByPoint(3, 3)
  );

  return doors;
};
