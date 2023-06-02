import { DIALOG_ENUMS } from "../enums";
import { DialogImplementation } from "../interfaces";

export class TextDialogImplementation implements DialogImplementation<string> {
  private animationIntervalId: number = 0;

  private getDialogElement() {
    const element = document.querySelector<HTMLDivElement>(
      DIALOG_ENUMS.DIALOG_UI_SELECTOR
    );

    if (!element) {
      throw new Error(
        `UI does not have the required dialog element ${DIALOG_ENUMS.DIALOG_UI_SELECTOR}. Please add it to the index.html file.`
      );
    }

    return element;
  }

  private showDialog() {
    const element = this.getDialogElement();
    element.hidden = false;
  }

  private getBackdropElement() {
    const element = document.querySelector<HTMLDivElement>(
      DIALOG_ENUMS.BACKDROP_UI_SELECTOR
    );

    if (!element) {
      throw new Error(
        `UI does not have the required dialog backdrop element ${DIALOG_ENUMS.BACKDROP_UI_SELECTOR}. Please add it to the index.html file.`
      );
    }

    return element;
  }

  private getContentElement() {
    const element = document.querySelector<HTMLPreElement>(
      DIALOG_ENUMS.CONTENT_UI_SELECTOR
    );

    if (!element) {
      throw new Error(
        `UI does not have the required dialog content element ${DIALOG_ENUMS.CONTENT_UI_SELECTOR}. Please add it to the index.html file.`
      );
    }

    return element;
  }

  init() {
    document
      .querySelector(DIALOG_ENUMS.CONFIRM_UI_SELECTOR)
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

  // todo akicha: to the abstraction class
  private showBackdrop() {
    const element = this.getBackdropElement();
    element.hidden = false;

    // delay class adding until the hidden attribute removed to allow dialog appearance animation
    window.setTimeout(() => {
      element.classList.add("visible");
    }, 0);
  }

  private hideDialog() {
    const element = this.getDialogElement();
    element.hidden = true;
  }

  private hideBackdrop() {
    const element = this.getBackdropElement();
    element.classList.remove("visible");

    if (this.animationIntervalId) {
      window.clearInterval(this.animationIntervalId);
      this.animationIntervalId = 0;
    }

    window.setTimeout(() => {
      element.hidden = true;
    }, 200);
  }

  private embedContent(text: string) {
    if (this.animationIntervalId) {
      return;
    }

    const element = this.getContentElement();
    element.textContent = "";

    let charIndex = 0;

    this.animationIntervalId = window.setInterval(() => {
      if (charIndex < text.length) {
        element.textContent = element.textContent + text[charIndex];
        charIndex += 1;
      } else {
        window.clearInterval(this.animationIntervalId);
        this.animationIntervalId = 0;
      }
    }, DIALOG_ENUMS.TEXT_ANIMATION_THROTTLE_RATE_MS);
  }
}
