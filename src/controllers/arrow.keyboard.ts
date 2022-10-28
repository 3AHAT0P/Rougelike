import { AppContext } from '../entities/AppContext';

export const listenArrowKeyPressed = (
  element: HTMLElement,
  appContext: AppContext,
  movePlayer: (
    appContext: AppContext,
    [dx, dy]: [dx: number, dy: number]
  ) => void
) => {
  element.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') movePlayer(appContext, [1, 0]);
    else if (event.key === 'ArrowLeft') movePlayer(appContext, [-1, 0]);
    else if (event.key === 'ArrowUp') movePlayer(appContext, [0, -1]);
    else if (event.key === 'ArrowDown') movePlayer(appContext, [0, 1]);
  });
};
