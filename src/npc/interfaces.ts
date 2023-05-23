// todo akicha: create a PositionedObject interface
export interface NPC {
  init: (image: string) => Promise<void>;
  updateIdlingPosition: () => void;
  draw: () => void;
  getX: () => number;
  setX: (x: number) => void;
  getY: () => number;
  setY: (y: number) => void;
}
