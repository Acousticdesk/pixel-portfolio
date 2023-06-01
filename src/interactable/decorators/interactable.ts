import dialogCloudImageBase64 from "../assets/images/dialog-cloud.png";
import { Canvas } from "../../canvas";
import { INTERACTABLE_DECORATOR_ENUMS } from "./enums";
import { InteractableSubject } from "./interfaces";
// import { Phrases } from "../../phrases";

// todo akicha 1: mv dialog, dialog area to interaction, interaction-area
export class InteractableDecorator {
  private subject: InteractableSubject<string, Promise<void>>;
  private interactionIcon!: HTMLImageElement;
  private interactionIconX = 0;
  private interactionIconY = 0;
  private interactionIconAnimationStep = 0;
  private lastInteractionIconAnimationFrameChange = Date.now();
  private canInteract = false;
  // this property is used to find the closes CompanionNPC when user collides with
  private interactionAreaId = 0;
  private interaction: (self: InteractableDecorator) => void;
  // todo akicha 1: add phrases to the companion decorator
  // private readonly phrases: Phrases;
  // constructor(subject: Movable, interactionAreaId: number, phrases: Phrases) {
  constructor(
    subject: InteractableSubject<string, Promise<void>>,
    interactionAreaId: number,
    interaction: (self: InteractableDecorator) => void
  ) {
    this.subject = subject;
    this.interactionIconX = this.subject.getX();
    this.interactionIconY =
      this.subject.getY() +
      INTERACTABLE_DECORATOR_ENUMS.INTERACTION_ICON_OFFSET_Y;
    this.interactionAreaId = interactionAreaId;
    // this.phrases = phrases;
    this.interaction = interaction;
  }
  // todo akicha 1: base64 string is optional
  async init(base64String: string) {
    this.interactionIcon = new Image();
    // todo akicha: make icon configurable
    this.interactionIcon.src = dialogCloudImageBase64;
    await new Promise((resolve, reject) => {
      this.interactionIcon.onload = resolve;
      this.interactionIcon.onerror = reject;
    });

    return this.subject.init(base64String);
  }

  // todo akicha: see if there is a chance to find a better naming for this method for Interactable, NPC and Player
  updateIdlingPosition() {
    const idleAnimationShouldThrottle =
      Date.now() - this.lastInteractionIconAnimationFrameChange <= 50;

    if (idleAnimationShouldThrottle) {
      return;
    }

    this.interactionIconAnimationStep += 1;

    if (
      this.interactionIconAnimationStep >
      INTERACTABLE_DECORATOR_ENUMS.INTERACTION_ICON_IDLE_ANIMATION_STEPS
    ) {
      this.interactionIconAnimationStep = 0;
    }

    this.lastInteractionIconAnimationFrameChange = Date.now();

    return this.subject.updateIdlingPosition();
  }

  draw() {
    if (!this.canInteract) {
      return this.subject.draw();
    }
    Canvas.getCtx().drawImage(
      this.interactionIcon,
      0,
      0,
      INTERACTABLE_DECORATOR_ENUMS.INTERACTION_ICON_SIZE,
      INTERACTABLE_DECORATOR_ENUMS.INTERACTION_ICON_SIZE,
      this.interactionIconX,
      this.interactionIconY + this.interactionIconAnimationStep,
      INTERACTABLE_DECORATOR_ENUMS.INTERACTION_ICON_SIZE,
      INTERACTABLE_DECORATOR_ENUMS.INTERACTION_ICON_SIZE
    );
    return this.subject.draw();
  }
  getX() {
    return this.subject.getX();
  }
  setX(x: number) {
    this.interactionIconX = x;
    return this.subject.setX(x);
  }
  getY() {
    return this.subject.getY();
  }
  setY(y: number) {
    this.interactionIconY =
      y + INTERACTABLE_DECORATOR_ENUMS.INTERACTION_ICON_OFFSET_Y;
    return this.subject.setY(y);
  }

  // todo akicha 1: come up with a shorter name
  allowToInteractWith() {
    this.canInteract = true;
  }

  // todo akicha 1: come up with a shorter name
  restrictToInteractWith() {
    this.canInteract = false;
  }

  getInteractionAreaId() {
    return this.interactionAreaId;
  }

  // todo akicha 1: move to the CompanionDecorator
  // getPhrases() {
  //   return this.phrases;
  // }

  getSubject() {
    return this.subject;
  }

  interact() {
    this.interaction(this);
  }
}
