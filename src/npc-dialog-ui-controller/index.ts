import { NPC_DIALOG_UI_CONTROLLER_ENUMS } from "./enums";

export class NpcDialogUiController {
  private static handleDialogShow() {
    NpcDialogUiController.showDialog();
    NpcDialogUiController.showBackdrop();
    NpcDialogUiController.animateText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    );
  }

  private static handleDialogHide() {
    NpcDialogUiController.hideDialog();
    NpcDialogUiController.hideBackdrop();
  }

  static init() {
    document
      .querySelector<HTMLButtonElement>("#test_dialog")
      ?.addEventListener("click", NpcDialogUiController.handleDialogShow);

    document
      .querySelector(NPC_DIALOG_UI_CONTROLLER_ENUMS.CONFIRM_UI_SELECTOR)
      ?.addEventListener("click", NpcDialogUiController.handleDialogHide);
  }

  private static getDialogElement() {
    const element = document.querySelector<HTMLDivElement>(
      NPC_DIALOG_UI_CONTROLLER_ENUMS.DIALOG_UI_SELECTOR
    );

    if (!element) {
      throw new Error(
        `UI does not have the required dialog element ${NPC_DIALOG_UI_CONTROLLER_ENUMS.DIALOG_UI_SELECTOR}. Please add it to the index.html file.`
      );
    }

    return element;
  }
  static showDialog() {
    const element = NpcDialogUiController.getDialogElement();
    element.hidden = false;
  }

  private static getBackdropElement() {
    const element = document.querySelector<HTMLDivElement>(
      NPC_DIALOG_UI_CONTROLLER_ENUMS.BACKDROP_UI_SELECTOR
    );

    if (!element) {
      throw new Error(
        `UI does not have the required dialog backdrop element ${NPC_DIALOG_UI_CONTROLLER_ENUMS.BACKDROP_UI_SELECTOR}. Please add it to the index.html file.`
      );
    }

    return element;
  }

  private static getContentElement() {
    const element = document.querySelector<HTMLDivElement>(
      NPC_DIALOG_UI_CONTROLLER_ENUMS.CONTENT_UI_SELECTOR
    );

    if (!element) {
      throw new Error(
        `UI does not have the required dialog content element ${NPC_DIALOG_UI_CONTROLLER_ENUMS.CONTENT_UI_SELECTOR}. Please add it to the index.html file.`
      );
    }

    return element;
  }

  static showBackdrop() {
    const element = NpcDialogUiController.getBackdropElement();
    element.hidden = false;

    // delay class adding until the hidden attribute removed to allow dialog appearance animation
    window.setTimeout(() => {
      element.classList.add("visible");
    }, 0);
  }

  static hideDialog() {
    const element = NpcDialogUiController.getDialogElement();
    element.hidden = true;
  }

  static hideBackdrop() {
    const element = NpcDialogUiController.getBackdropElement();
    element.classList.remove("visible");

    window.setTimeout(() => {
      element.hidden = true;
    }, 200);
  }

  static animateText(text: string, charIndex = 0) {
    const element = NpcDialogUiController.getContentElement();
    element.textContent = "";

    const intervalId = window.setInterval(() => {
      if (charIndex < text.length) {
        element.textContent = element.textContent + text[charIndex];
        charIndex += 1;
      } else {
        window.clearInterval(intervalId);
      }
    }, NPC_DIALOG_UI_CONTROLLER_ENUMS.TEXT_ANIMATION_THROTTLE_RATE_MS);
  }
}
