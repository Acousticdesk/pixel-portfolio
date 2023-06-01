import { Dialog } from "../dialog";

export class DialogsController {
  private static dialogs: Record<string, Dialog> = {};
  static registerDialog(name: string, dialog: Dialog) {
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
