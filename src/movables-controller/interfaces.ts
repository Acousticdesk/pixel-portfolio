export interface Movable {
  getX: () => number;
  setX: (x: number) => void;
  getY: () => number;
  setY: (y: number) => void;
}

export interface MovableCollection {
  getItems: () => Movable[];
}
