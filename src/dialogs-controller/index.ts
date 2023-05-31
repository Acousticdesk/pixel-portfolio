import { NpcDialogUiController } from "../npc-dialog-ui-controller";

export class DialogsController {
  private static dialogs: Record<string, NpcDialogUiController> = {};
  static registerDialog(name: string, dialog: NpcDialogUiController) {
    DialogsController.dialogs[name] = dialog;
    dialog.init();
  }
  static getDialog(name: string) {
    if (!this.dialogs[name]) {
      throw new Error(
        `The dialog with name ${name} was never registered. Please check the DialogController.registerDialog calls.`
      );
    }
    return this.dialogs[name];
  }
}
