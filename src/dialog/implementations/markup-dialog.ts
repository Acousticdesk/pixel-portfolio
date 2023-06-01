import { DialogImplementation } from "../interfaces";
import { DIALOG_ENUMS } from "../enums";

export class MarkupDialogImplementation
  implements DialogImplementation<string>
{
  private getDialogElement() {
    const element = document.querySelector<HTMLDivElement>(
      DIALOG_ENUMS.MARKUP_DIALOG_UI_SELECTOR
    );

    if (!element) {
      throw new Error(
        `UI does not have the required dialog element ${DIALOG_ENUMS.MARKUP_DIALOG_UI_SELECTOR}. Please add it to the index.html file.`
      );
    }

    return element;
  }

  private getBackdropElement() {
    const element = document.querySelector<HTMLDivElement>(
      DIALOG_ENUMS.MARKUP_BACKDROP_UI_SELECTOR
    );

    if (!element) {
      throw new Error(
        `UI does not have the required dialog backdrop element ${DIALOG_ENUMS.MARKUP_BACKDROP_UI_SELECTOR}. Please add it to the index.html file.`
      );
    }

    return element;
  }

  private getContentElement() {
    const element = document.querySelector<HTMLPreElement>(
      DIALOG_ENUMS.MARKUP_CONTENT_UI_SELECTOR
    );

    if (!element) {
      throw new Error(
        `UI does not have the required dialog content element ${DIALOG_ENUMS.MARKUP_CONTENT_UI_SELECTOR}. Please add it to the index.html file.`
      );
    }

    return element;
  }

  init() {
    document
      .querySelector(DIALOG_ENUMS.MARKUP_CONFIRM_UI_SELECTOR)
      ?.addEventListener("click", this.handleDialogHide.bind(this));
  }

  handleDialogHide() {
    this.hideDialog();
    this.hideBackdrop();
  }

  handleDialogShow(content: string) {
    this.showDialog();
    this.showBackdrop();
    this.embedContent(content);
  }

  private embedContent(content: string) {
    const element = this.getContentElement();

    element.innerHTML = content;
  }

  private hideBackdrop() {
    const element = this.getBackdropElement();
    element.classList.remove("visible");

    window.setTimeout(() => {
      element.hidden = true;
    }, 200);
  }

  private hideDialog() {
    const element = this.getDialogElement();
    element.scrollTo(0, 0);
    element.hidden = true;
  }

  private showBackdrop() {
    const element = this.getBackdropElement();
    element.hidden = false;

    // delay class adding until the hidden attribute removed to allow dialog appearance animation
    window.setTimeout(() => {
      element.classList.add("visible");
    }, 0);
  }

  private showDialog() {
    const element = this.getDialogElement();
    element.hidden = false;
  }
}
