export interface NPC {
  init: (parameters: {
    src: string;
    numberOfFrames: number;
    framesOfInterest: number[];
  }) => Promise<void>;
  updateAnimationSpriteFrame: () => void;
  draw: () => void;
}
