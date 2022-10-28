export interface Cell {
  rowIndex: number;
  columnIndex: number;
  size: { x: number; y: number };
  isVisible: boolean;
  isStart: boolean;
  isEnd: boolean;
}
