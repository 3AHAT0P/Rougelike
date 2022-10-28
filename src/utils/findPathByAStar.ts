import { Cell } from '../entities/Cell';
import { getManhattanDistanceBetween } from './getManhattanDistanceBetween';

export const findPathByAStar = (
  from: Cell,
  to: Cell,
  getNeighbors: (cell: Cell) => Cell[]
): [pathIsExists: true, path: Cell[]] | [pathIsExists: false, path: null] => {
  type GNode = [Cell, number, number, GNode | null];

  const openList: GNode[] = [
    [from, 0, getManhattanDistanceBetween(from, to), null],
  ];
  const closedList = [];

  const answer: Cell[] = [];

  const compareNodesByF = (a: GNode, b: GNode) =>
    a[1] + a[2] > b[1] + b[2] ? 1 : a[1] + a[2] === b[1] + b[2] ? 0 : -1;

  let infinityLoopPrevention = 100;

  while (true) {
    openList.sort(compareNodesByF);
    const node: GNode = openList.shift()!;
    if (node == null) {
      return [false, null];
    }

    const neighbors: Cell[] = getNeighbors(node[0]);

    for (const cell of neighbors) {
      if (cell === to) {
        let currentNode: GNode | null = [cell, node[1] + 1, 0, node];
        while (currentNode != null) {
          answer.unshift(currentNode[0]);
          currentNode = currentNode[3];
        }
        return [true, answer];
      }
      const childNode: GNode = [
        cell,
        node[1] + 1,
        getManhattanDistanceBetween(cell, to),
        node,
      ];
      const openChildNode = openList.find((openNode) => {
        return (
          openNode[0] === childNode[0] &&
          openNode[1] + openNode[2] <= childNode[1] + childNode[2]
        );
      });
      const closedChildNode = closedList.find((closedNode) => {
        return (
          closedNode[0] === childNode[0] &&
          closedNode[1] + closedNode[2] <= childNode[1] + childNode[2]
        );
      });

      if (openChildNode == null && closedChildNode == null)
        openList.push(childNode);
    }

    closedList.push(node);
    infinityLoopPrevention -= 1;
    if (infinityLoopPrevention < 0) {
      return [false, null];
    }
  }
};
