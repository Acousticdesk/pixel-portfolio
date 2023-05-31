import { NPC_DIALOG_UI_CONTROLLER_ENUMS } from "./enums";
import { DialogImplementation } from "./interfaces";

// todo akicha 1: rename to Dialog
// todo akicha 1: see what happens when dialog height happens to be more than the viewport height
export class NpcDialogUiController {
  handleDialogShow(content: string) {
    this.implementation.handleDialogShow(content);
  }

  private handleDialogHide() {
    this.implementation.handleDialogHide();
  }

  private implementation: DialogImplementation<string>;

  constructor(implementation: DialogImplementation<string>) {
    this.implementation = implementation;
  }

  init() {
    this.implementation.init();

    document.body.addEventListener("keyup", (e) => {
      if (["Escape", "Enter"].includes(e.key)) {
        this.handleDialogHide();
      }
    });
  }
}
