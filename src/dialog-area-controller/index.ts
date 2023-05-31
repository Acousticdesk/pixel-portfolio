import { DialogArea } from "../dialog-area";

// todo akicha: rename to InteractionAreaController
export class DialogAreaController {
  static dialogAreas: DialogArea[];

  static init(dialogAreas: { x: number; y: number; value: number }[]) {
    DialogAreaController.dialogAreas = dialogAreas.map(
      (dialogArea) => new DialogArea(dialogArea)
    );
  }

  static draw() {
    DialogAreaController.getDialogAreas().forEach((dialogArea) => {
      dialogArea.draw();
    });
  }

  static getDialogAreas() {
    return this.dialogAreas;
  }
}
