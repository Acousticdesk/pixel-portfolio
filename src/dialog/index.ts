import { DialogImplementation } from "./interfaces";

export class Dialog {
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
      if (["Escape", "Enter"].includes(e.code)) {
        this.handleDialogHide();
      }
    });
  }
}
