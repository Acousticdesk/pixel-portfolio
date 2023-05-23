export interface NPC {
  init: (image: string) => Promise<void>;
  updateIdlingPosition: () => void;
  draw: () => void;
}
