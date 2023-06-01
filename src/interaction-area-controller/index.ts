import { InteractionArea } from "../interaction-area";

export class InteractionAreaController {
  static dialogAreas: InteractionArea[];

  static init(dialogAreas: { x: number; y: number; value: number }[]) {
    InteractionAreaController.dialogAreas = dialogAreas.map(
      (dialogArea) => new InteractionArea(dialogArea)
    );
  }

  static draw() {
    InteractionAreaController.getInteractionAreas().forEach((dialogArea) => {
      dialogArea.draw();
    });
  }

  static getInteractionAreas() {
    return this.dialogAreas;
  }
}
