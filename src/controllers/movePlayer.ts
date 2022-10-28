import { AppContext } from '../entities/AppContext';

export const movePlayer = (
  appContext: AppContext,
  [dx, dy]: [dx: number, dy: number]
) => {
  if (appContext.isMoved) return;

  const newPlayerPosition = { ...appContext.player.position };

  newPlayerPosition.columnIndex += dx;
  if (newPlayerPosition.columnIndex < 0) newPlayerPosition.columnIndex = 0;
  if (newPlayerPosition.columnIndex >= appContext.columnNumber)
    newPlayerPosition.columnIndex = appContext.columnNumber - 1;

  newPlayerPosition.rowIndex += dy;
  if (newPlayerPosition.rowIndex < 0) newPlayerPosition.rowIndex = 0;
  if (newPlayerPosition.rowIndex >= appContext.rowNumber)
    newPlayerPosition.rowIndex = appContext.rowNumber - 1;

  const oldPositionCell = appContext.cells.getCellByPoint(
    appContext.player.position.columnIndex,
    appContext.player.position.rowIndex
  );
  const newPositionCell = appContext.cells.getCellByPoint(
    newPlayerPosition.columnIndex,
    newPlayerPosition.rowIndex
  );

  const door = appContext.doors.find(({ from, to }) => {
    return (
      (from === oldPositionCell && to === newPositionCell) ||
      (from === newPositionCell && to === oldPositionCell)
    );
  });

  if (door == null) return;

  newPositionCell.isVisible = true;

  appContext.player.position.columnIndex = newPlayerPosition.columnIndex;
  appContext.player.position.rowIndex = newPlayerPosition.rowIndex;

  appContext.needRender = true;
  appContext.isMoved = true;
};
