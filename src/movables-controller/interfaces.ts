export interface Movable {
  x: number;
  y: number;
  getX: () => number;
  setX: (x: number) => void;
  getY: () => number;
  setY: (y: number) => void;
}

export interface MovableCollection {
  getItems: () => Movable[];
}
