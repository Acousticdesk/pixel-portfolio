import dialogCloudImageBase64 from "../assets/images/dialog-cloud.png";
import { Canvas } from "../../canvas";
import { COMPANION_DECORATOR_ENUMS } from "./enums";
import { NPC } from "../interfaces";
import { Companion } from "./interfaces";
import { Movable } from "../../movables-controller/interfaces";

export class CompanionDecorator implements NPC, Companion {
  private npc: NPC & Movable;
  private interactionIcon!: HTMLImageElement;
  private interactionIconX = 0;
  private interactionIconY = 0;
  private interactionIconAnimationStep = 0;
  private lastIdleInteractionIconChange = Date.now();
  private canSpeak = false;
  // this property is used to find the closes CompanionNPC when user collides with
  private dialogAreaId = 0;
  constructor(npc: NPC & Movable, dialogAreaId: number) {
    this.npc = npc;
    this.interactionIconX = this.npc.getX();
    this.interactionIconY =
      this.npc.getY() +
      COMPANION_DECORATOR_ENUMS.DIALOG_INTERACTION_ICON_OFFSET_Y;
    this.dialogAreaId = dialogAreaId;
  }
  async init(base64String: string) {
    this.interactionIcon = new Image();
    this.interactionIcon.src = dialogCloudImageBase64;
    await new Promise((resolve, reject) => {
      this.interactionIcon.onload = resolve;
      this.interactionIcon.onerror = reject;
    });
    return this.npc.init(base64String);
  }
  updateIdlingPosition() {
    const idleAnimationShouldThrottle =
      Date.now() - this.lastIdleInteractionIconChange <= 50;

    if (idleAnimationShouldThrottle) {
      return;
    }

    this.interactionIconAnimationStep += 1;

    if (
      this.interactionIconAnimationStep >
      COMPANION_DECORATOR_ENUMS.DIALOG_INTERACTION_ICON_IDLE_ANIMATION_STEPS
    ) {
      this.interactionIconAnimationStep = 0;
    }

    this.lastIdleInteractionIconChange = Date.now();

    return this.npc.updateIdlingPosition();
  }

  draw() {
    if (!this.canSpeak) {
      return this.npc.draw();
    }
    Canvas.getCtx().drawImage(
      this.interactionIcon,
      0,
      0,
      COMPANION_DECORATOR_ENUMS.DIALOG_INTERACTION_ICON_SIZE,
      COMPANION_DECORATOR_ENUMS.DIALOG_INTERACTION_ICON_SIZE,
      this.interactionIconX,
      this.interactionIconY + this.interactionIconAnimationStep,
      COMPANION_DECORATOR_ENUMS.DIALOG_INTERACTION_ICON_SIZE,
      COMPANION_DECORATOR_ENUMS.DIALOG_INTERACTION_ICON_SIZE
    );
    return this.npc.draw();
  }
  getX() {
    return this.npc.getX();
  }
  setX(x: number) {
    this.interactionIconX = x;
    return this.npc.setX(x);
  }
  getY() {
    return this.npc.getY();
  }
  setY(y: number) {
    this.interactionIconY =
      y + COMPANION_DECORATOR_ENUMS.DIALOG_INTERACTION_ICON_OFFSET_Y;
    return this.npc.setY(y);
  }

  allowToTalkTo() {
    this.canSpeak = true;
  }

  restrictToTalkTo() {
    this.canSpeak = false;
  }

  getDialogAreaId() {
    return this.dialogAreaId;
  }
}
