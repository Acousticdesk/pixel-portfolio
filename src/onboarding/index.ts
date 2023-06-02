import { ONBOARDING_ENUMS } from "./enums";

export class Onboarding {
  private static handleKeydown(e: KeyboardEvent) {
    if (["KeyW", "KeyA", "KeyS", "KeyD"].includes(e.code)) {
      const backdropElement = Onboarding.getBackdropElement();
      const onboardingElement = Onboarding.getOnboardingElement();

      backdropElement.classList.add("onboarding--fade-out");
      onboardingElement.classList.add("onboarding--fade-out");

      window.setTimeout(() => {
        backdropElement.hidden = true;
        onboardingElement.hidden = true;
      }, ONBOARDING_ENUMS.FADE_OUT_ANIMATION_TIME_MS);

      document.body.removeEventListener("keydown", Onboarding.handleKeydown);
    }
  }
  static init() {
    document.body.addEventListener("keydown", Onboarding.handleKeydown);
  }

  static getBackdropElement() {
    const element = document.querySelector<HTMLDivElement>(
      ONBOARDING_ENUMS.BACKDROP_UI_SELECTOR
    );

    if (!element) {
      throw new Error(
        `No onboarding backdrop element was found. Please add ${ONBOARDING_ENUMS.BACKDROP_UI_SELECTOR} to the index.html`
      );
    }

    return element;
  }

  static getOnboardingElement() {
    const element = document.querySelector<HTMLDivElement>(
      ONBOARDING_ENUMS.ONBOARDING_UI_SELECTOR
    );

    if (!element) {
      throw new Error(
        `No onboarding element was found. Please add ${ONBOARDING_ENUMS.ONBOARDING_UI_SELECTOR} to the index.html`
      );
    }

    return element;
  }
}
