import { Cell } from './entities/Cell';

export class CellList {
  private _cells: Cell[] = [];

  private _rowNumber: number = 0;
  private _columnNumber: number = 0;

  constructor(
    columnNumber: number,
    rowNumber: number,
    cellSize: { x: number; y: number }
  ) {
    this._rowNumber = rowNumber;
    this._columnNumber = columnNumber;

    for (let rowIndex = 0; rowIndex < rowNumber; rowIndex += 1) {
      for (let columnIndex = 0; columnIndex < columnNumber; columnIndex += 1) {
        const cell: Cell = {
          rowIndex,
          columnIndex,
          size: cellSize,
          isVisible: false,
          isStart: false,
          isEnd: false,
        };

        this._cells.push(cell);
      }
    }
  }

  public getStartCell(): Cell {
    const cell = this._cells.find((cell) => cell.isStart);

    if (cell == null) throw new Error('Start cell is not defined');

    return cell;
  }

  public getEndCell(): Cell {
    const cell = this._cells.find((cell) => cell.isEnd);

    if (cell == null) throw new Error('End cell is not defined');

    return cell;
  }

  public getCellByPoint(columnIndex: number, rowIndex: number): Cell {
    if (columnIndex < 0 || columnIndex >= this._columnNumber)
      throw new Error('Incorrect column index');
    if (rowIndex < 0 || rowIndex >= this._rowNumber)
      throw new Error('Incorrect row index');

    const cell = this._cells[rowIndex * this._columnNumber + columnIndex];

    return cell;
  }

  public getCellToUpOfPoint(columnIndex: number, rowIndex: number): Cell {
    return this.getCellByPoint(columnIndex, rowIndex - 1);
  }

  public getCellToDownOfPoint(columnIndex: number, rowIndex: number): Cell {
    return this.getCellByPoint(columnIndex, rowIndex + 1);
  }

  public getCellToLeftOfPoint(columnIndex: number, rowIndex: number): Cell {
    return this.getCellByPoint(columnIndex - 1, rowIndex);
  }

  public getCellToRightOfPoint(columnIndex: number, rowIndex: number): Cell {
    return this.getCellByPoint(columnIndex + 1, rowIndex);
  }

  public getNearestCellsOfPoint(columnIndex: number, rowIndex: number): Cell[] {
    if (columnIndex < 0 || columnIndex >= this._columnNumber)
      throw new Error('Incorrect column index');
    if (rowIndex < 0 || rowIndex >= this._rowNumber)
      throw new Error('Incorrect row index');

    const cells = [];
    if (columnIndex - 1 >= 0)
      cells.push(this._cells[rowIndex * this._columnNumber + columnIndex - 1]);
    if (columnIndex + 1 < this._columnNumber)
      cells.push(this._cells[rowIndex * this._columnNumber + columnIndex + 1]);
    if (rowIndex - 1 >= 0)
      cells.push(
        this._cells[(rowIndex - 1) * this._columnNumber + columnIndex]
      );
    if (rowIndex + 1 < this._rowNumber)
      cells.push(
        this._cells[(rowIndex + 1) * this._columnNumber + columnIndex]
      );

    return cells;
  }

  [Symbol.iterator]() {
    return this._cells.values();
  }
}
