import { NPC } from "../npc/interfaces";
import { Movable } from "../movables-controller/interfaces";
import { InteractableDecorator } from "../interactable/decorators";

export class InteractableController {
  private interactables: InteractableDecorator[] = [];

  addInteractable(interactable: InteractableDecorator) {
    this.interactables.push(interactable);
  }

  updateIdlingPosition() {
    this.interactables.forEach((interactable) =>
      interactable.updateIdlingPosition()
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
