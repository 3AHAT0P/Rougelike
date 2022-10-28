import { CellList } from './CellList';
import { listenArrowKeyPressed } from './controllers/arrow.keyboard';
import { movePlayer } from './controllers/movePlayer';
import { AppContext } from './entities/AppContext';
import { Cell } from './entities/Cell';
import { generateDoors } from './generators/doors.generator';
import { render } from './renderers/render';
import { findPathByAStar } from './utils/findPathByAStar';

export const createApp = (isDebugMode: boolean) => {
  const canvasElement = document.createElement('canvas');

  canvasElement.width = window.innerWidth - 30;
  canvasElement.height = window.innerHeight - 30;

  const renderingContext: CanvasRenderingContext2D | null =
    canvasElement.getContext('2d');

  if (renderingContext == null) throw new Error('Canvas 2d context is null');

  const rowNumber = 13;
  const columnNumber = 13;

  const appContext: AppContext = {
    isDebugMode,
    canvasElement,
    renderingContext,
    rowNumber,
    columnNumber,
    needRender: true,
    isMoved: false,
    cells: new CellList(columnNumber, rowNumber, {
      x: 50,
      y: 50,
    }),
    player: {
      position: {
        rowIndex: 0,
        columnIndex: 0,
      },
    },
    doors: [],
  };

  const startCell = appContext.cells.getCellByPoint(0, 0);
  startCell.isStart = true;
  startCell.isVisible = true;

  const endCell = appContext.cells.getCellByPoint(9, 9);
  endCell.isEnd = true;
  endCell.isVisible = true;

  const getNeighbors = (target: Cell): Cell[] => {
    return appContext.doors
      .map(({ from, to }) => {
        if (from === target) return to;
        if (to === target) return from;
        return null;
      })
      .filter((cell) => cell !== null) as Cell[];
  };

  let infinityLoopReventionIndex = 100;
  do {
    appContext.doors = generateDoors(appContext.cells);

    const [pathIsExists, path] = findPathByAStar(
      startCell,
      endCell,
      getNeighbors
    );
    if (pathIsExists) {
      if (appContext.isDebugMode) appContext.__shortestPath = path;
      break;
    }
    infinityLoopReventionIndex -= 1;
    if (infinityLoopReventionIndex === 0) break;
  } while (true);

  return {
    renderTo(rootElement: HTMLElement) {
      rootElement.appendChild(canvasElement);
      listenArrowKeyPressed(document as any, appContext, movePlayer);
      render(appContext);
    },
  };
};
