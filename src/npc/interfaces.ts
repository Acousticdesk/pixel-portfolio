export interface NPC {
  init: (image: string) => Promise<void>;
  updateAnimationSpriteFrame: () => void;
  draw: () => void;
}
