import { Player } from '../entities/Player';

export const renderPlayer = (
  ctx: CanvasRenderingContext2D,
  player: Player,
  cellSize: { x: number; y: number }
) => {
  const cellCenter: [number, number] = [
    player.position.columnIndex * cellSize.x + cellSize.x / 2,
    player.position.rowIndex * cellSize.y + cellSize.y / 2,
  ];
  ctx.beginPath();
  ctx.arc(...cellCenter, 10, 0, 360);
  ctx.fill();
};
