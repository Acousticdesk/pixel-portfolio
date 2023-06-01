import { InteractionArea } from "../interaction-area";

export class InteractionAreaController {
  static interactionAreas: InteractionArea[];

  static init(interactionAreas: { x: number; y: number; value: number }[]) {
    InteractionAreaController.interactionAreas = interactionAreas.map(
      (interactionArea) => new InteractionArea(interactionArea)
    );
  }

  static draw() {
    InteractionAreaController.getInteractionAreas().forEach(
      (interactionArea) => {
        interactionArea.draw();
      }
    );
  }

  static getInteractionAreas() {
    return this.interactionAreas;
  }
}
