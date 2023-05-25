import playerMovementSprite from "./assets/images/Alex_run_32x32.png";
import { PLAYER_ENUMS } from "./enums";
import { Canvas } from "../canvas";
import { PLAYER_CONSTS } from "./consts";
import { Sprite } from "../sprite";

export class Player {
  static x: number;
  static y: number;
  static SINGLE_PRESET_WIDTH: number;
  static movementDirection:
    | PLAYER_ENUMS.MOVEMENT_DIRECTION_UP
    | PLAYER_ENUMS.MOVEMENT_DIRECTION_RIGHT
    | PLAYER_ENUMS.MOVEMENT_DIRECTION_DOWN
    | PLAYER_ENUMS.MOVEMENT_DIRECTION_LEFT =
    PLAYER_ENUMS.MOVEMENT_DIRECTION_DOWN;
  static currentMovementSpriteIndex = PLAYER_CONSTS.MOVING_DOWN_SPRITE_INDEX[0];
  static isMoving = false;
  static lastMovementSpriteChange = Date.now();
  static sprite = new Sprite(playerMovementSprite);

  static async init() {
    await this.sprite.init();

    const playerImage = this.sprite.getImage();

    // todo akicha: can be a part of the Sprite class
    Player.SINGLE_PRESET_WIDTH =
      playerImage.width / PLAYER_ENUMS.NUMBER_OF_MOVEMENT_SPRITE_PRESETS;

    const canvas = Canvas.getCanvas();

    Player.x = canvas.width / 2 - Player.SINGLE_PRESET_WIDTH / 2;
    Player.y = canvas.height / 2 - playerImage.height / 2;

    Player.draw();
  }

  // actual movement of the player on the map is performed by changing the position of the map background
  // the current method is only being used to animate the player's movement
  static move() {
    // prevent updating the sprite on each requestAnimationFrame tick
    const movementAnimationRateShouldThrottle =
      Date.now() - Player.lastMovementSpriteChange <= 50;

    if (!Player.isMoving || movementAnimationRateShouldThrottle) {
      return;
    }
    // we need it to know the range of the sprite where a proper move direction is drawn
    const spriteIndexRange =
      PLAYER_CONSTS[`MOVING_${Player.movementDirection}_SPRITE_INDEX`];
    Player.currentMovementSpriteIndex += 1;
    if (Player.currentMovementSpriteIndex > spriteIndexRange[1]) {
      Player.currentMovementSpriteIndex = spriteIndexRange[0];
    }
    Player.lastMovementSpriteChange = Date.now();
  }

  static startMoving() {
    Player.isMoving = true;
  }

  static stopMoving() {
    Player.isMoving = false;
  }

  static setMovementDirection(direction: typeof Player.movementDirection) {
    if (Player.movementDirection === direction) {
      return;
    }
    Player.movementDirection = direction;
    const spriteIndexRange = PLAYER_CONSTS[`MOVING_${direction}_SPRITE_INDEX`];
    Player.currentMovementSpriteIndex = spriteIndexRange[0];
  }

  static draw() {
    const playerImage = Player.sprite.getImage();
    Canvas.getCtx().drawImage(
      playerImage,
      Player.currentMovementSpriteIndex * Player.SINGLE_PRESET_WIDTH,
      0,
      Player.SINGLE_PRESET_WIDTH,
      playerImage.height,
      Player.x,
      Player.y,
      Player.SINGLE_PRESET_WIDTH,
      playerImage.height
    );
  }
}
