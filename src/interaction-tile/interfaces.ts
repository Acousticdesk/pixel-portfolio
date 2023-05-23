export interface InteractionTile {
  x: number;
  y: number;
  getX: () => number;
  setX: (x: number) => void;
  getY: () => number;
  setY: (y: number) => void;
  draw: () => void;
}
