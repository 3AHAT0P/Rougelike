import { AppContext } from '../entities/AppContext';

import { renderCellList } from './renderCellList';
import { renderDoor } from './renderDoor';
import { renderPlayer } from './renderPlayer';

const frameDeltaTime = 100;

export const render = (appContext: AppContext) => {
  if (!appContext.needRender) {
    setTimeout(render, frameDeltaTime, appContext);
    return;
  }

  appContext.renderingContext.clearRect(
    0,
    0,
    appContext.canvasElement.width,
    appContext.canvasElement.height
  );

  renderCellList(
    appContext.renderingContext,
    appContext.cells,
    appContext.isDebugMode
  );
  renderPlayer(appContext.renderingContext, appContext.player, {
    x: 50,
    y: 50,
  });

  for (const door of appContext.doors) {
    renderDoor(appContext.renderingContext, door, appContext.isDebugMode);
  }

  if (appContext.isDebugMode && appContext.__shortestPath != null) {
    for (const cell of appContext.__shortestPath) {
      const from: [number, number] = [
        cell.columnIndex * cell.size.x + cell.size.x / 2 - 10,
        cell.rowIndex * cell.size.y + cell.size.y / 2 - 10,
      ];
      appContext.renderingContext.save();
      appContext.renderingContext.beginPath();
      appContext.renderingContext.rect(...from, 20, 20);
      appContext.renderingContext.fillStyle = 'blue';
      appContext.renderingContext.fill();
      appContext.renderingContext.restore();
    }
  }

  appContext.needRender = false;
  appContext.isMoved = false;
  setTimeout(render, frameDeltaTime, appContext);
};
