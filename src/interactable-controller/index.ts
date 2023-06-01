import { InteractableDecorator } from "../interactable";

export class InteractableController {
  private interactables: InteractableDecorator[] = [];

  addInteractable(interactable: InteractableDecorator) {
    this.interactables.push(interactable);
  }

  updateAnimationSpriteFrame() {
    this.interactables.forEach((interactable) =>
      interactable.updateAnimationSpriteFrame()
    );
    return this;
  }

  draw() {
    this.interactables.forEach((interactable) => interactable.draw());
    return this;
  }

  getInteractables() {
    return this.interactables;
  }
}
