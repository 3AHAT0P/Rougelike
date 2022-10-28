import { CellList } from '../CellList';

export const renderCellList = (
  ctx: CanvasRenderingContext2D,
  cellList: CellList,
  isDebugMode: boolean = false
) => {
  for (const cell of cellList) {
    if (!isDebugMode && !cell.isVisible) continue;
    const from: [number, number] = [
      cell.columnIndex * cell.size.x,
      cell.rowIndex * cell.size.y,
    ];
    ctx.save();
    ctx.beginPath();
    ctx.rect(...from, cell.size.x, cell.size.y);
    if (cell.isStart) ctx.strokeStyle = 'green';
    if (cell.isEnd) ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.restore();
  }
};
