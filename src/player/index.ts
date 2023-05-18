import playerMovementSprite from "./assets/images/Alex_run_16x16.png";
import { PLAYER_ENUMS } from "./enums";
import { Canvas } from "../canvas";

export class Player {
  static x: number;
  static y: number;
  static SINGLE_PRESET_WIDTH: number;
  static playerImage: HTMLImageElement;
  static init() {
    const playerImage = new Image();
    playerImage.src = playerMovementSprite;
    Player.playerImage = playerImage;

    return new Promise<void>((resolve, reject) => {
      playerImage.onload = () => {
        Player.SINGLE_PRESET_WIDTH =
          playerImage.width / PLAYER_ENUMS.NUMBER_OF_MOVEMENT_SPRITE_PRESETS;

        const canvas = Canvas.getCanvas();

        Player.x = canvas.width / 2 - Player.SINGLE_PRESET_WIDTH / 2;
        Player.y = canvas.height / 2 - Player.SINGLE_PRESET_WIDTH / 2;

        Player.draw();
        resolve();
      };

      playerImage.onerror = (e) => {
        reject(e);
      };
    });
  }

  static draw() {
    Canvas.getCtx().drawImage(
      Player.playerImage,
      0,
      0,
      Player.SINGLE_PRESET_WIDTH,
      Player.playerImage.height,
      Player.x,
      Player.y,
      Player.SINGLE_PRESET_WIDTH,
      Player.playerImage.height
    );
  }
}
