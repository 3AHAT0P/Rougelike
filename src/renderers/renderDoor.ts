import { Door } from '../entities/Door';

export const renderDoor = (
  ctx: CanvasRenderingContext2D,
  { from, to }: Door,
  isDebugMode: boolean = false
) => {
  if (!isDebugMode && !from.isVisible && !to.isVisible) return;

  let leftTopCorner: [x: number, y: number] = [0, 0];
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = 'violet';

  if (from.columnIndex === to.columnIndex) {
    if (from.rowIndex < to.rowIndex) {
      leftTopCorner = [
        to.columnIndex * to.size.x + to.size.x / 3,
        to.rowIndex * to.size.y - 2,
      ];
    } else if (from.rowIndex > to.rowIndex) {
      leftTopCorner = [
        from.columnIndex * from.size.x + from.size.x / 3,
        from.rowIndex * from.size.y - 2,
      ];
    }
    ctx.rect(...leftTopCorner, from.size.x / 3, 4);
  } else if (from.rowIndex === to.rowIndex) {
    if (from.columnIndex < to.columnIndex) {
      leftTopCorner = [
        to.columnIndex * to.size.x - 2,
        to.rowIndex * to.size.y + to.size.y / 3,
      ];
    } else if (from.columnIndex > to.columnIndex) {
      leftTopCorner = [
        from.columnIndex * from.size.x - 2,
        from.rowIndex * from.size.y + from.size.y / 3,
      ];
    }
    ctx.rect(...leftTopCorner, 4, from.size.y / 3);
  }
  ctx.fill();
  ctx.restore();
};
