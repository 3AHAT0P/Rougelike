import { CellList } from '../CellList';
import { Cell } from './Cell';
import { Door } from './Door';
import { Player } from './Player';

export interface AppContext {
  __shortestPath?: Cell[];
  isDebugMode: boolean;
  canvasElement: HTMLCanvasElement;
  renderingContext: CanvasRenderingContext2D;
  player: Player;
  isMoved: boolean;
  needRender: boolean;
  cells: CellList;
  rowNumber: number;
  columnNumber: number;
  doors: Door[];
}
