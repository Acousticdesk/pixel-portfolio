import { Keyboard } from "../keyboard";
import { Map } from "../map";
import { MapForeground } from "../map-foreground";
import { PLAYER_ENUMS } from "../player/enums";
import { PlayerBoundaryCollisionController } from "../player-boundary-collision-controller";
import { Player } from "../player";
import { MovablesController } from "../movables-controller";

export class MovementController {
  static updatePlayerDirection() {
    const keyToDirectionMap: {
      [key: keyof typeof Keyboard.keys]:
        | PLAYER_ENUMS.MOVEMENT_DIRECTION_UP
        | PLAYER_ENUMS.MOVEMENT_DIRECTION_DOWN
        | PLAYER_ENUMS.MOVEMENT_DIRECTION_LEFT
        | PLAYER_ENUMS.MOVEMENT_DIRECTION_RIGHT;
    } = {
      KeyW: PLAYER_ENUMS.MOVEMENT_DIRECTION_UP,
      KeyS: PLAYER_ENUMS.MOVEMENT_DIRECTION_DOWN,
      KeyA: PLAYER_ENUMS.MOVEMENT_DIRECTION_LEFT,
      KeyD: PLAYER_ENUMS.MOVEMENT_DIRECTION_RIGHT,
    };

    if (!Keyboard.lastPressed || !keyToDirectionMap[Keyboard.lastPressed]) {
      return;
    }

    Player.setMovementDirection(keyToDirectionMap[Keyboard.lastPressed]);
    Player.startMoving();
  }
  static move() {
    const velocity = PLAYER_ENUMS.MOVEMENT_VELOCITY;

    Player.stopMoving();
    MovementController.updatePlayerDirection();

    if (
      Keyboard.keys.KeyW.pressed &&
      !PlayerBoundaryCollisionController.isCollisionDetected([0, -velocity])
    ) {
      Map.setImageOffsetY(Map.imageOffsetY + velocity);
      MapForeground.setImageOffsetY(MapForeground.imageOffsetY + velocity);
      MovablesController.move((movable) => {
        movable.setY(movable.getY() + velocity);
      });
    }
    if (
      Keyboard.keys.KeyS.pressed &&
      !PlayerBoundaryCollisionController.isCollisionDetected([
        0,
        velocity as number,
      ])
    ) {
      Map.setImageOffsetY(Map.imageOffsetY - velocity);
      MapForeground.setImageOffsetY(MapForeground.imageOffsetY - velocity);
      MovablesController.move((movable) => {
        movable.setY(movable.getY() - velocity);
      });
    }
    if (
      Keyboard.keys.KeyA.pressed &&
      !PlayerBoundaryCollisionController.isCollisionDetected([-velocity, 0])
    ) {
      Map.setImageOffsetX(Map.imageOffsetX + velocity);
      MapForeground.setImageOffsetX(MapForeground.imageOffsetX + velocity);
      MovablesController.move((movable) => {
        movable.setX(movable.getX() + velocity);
      });
    }
    if (
      Keyboard.keys.KeyD.pressed &&
      !PlayerBoundaryCollisionController.isCollisionDetected([
        velocity as number,
        0,
      ])
    ) {
      Map.setImageOffsetX(Map.imageOffsetX - velocity);
      MapForeground.setImageOffsetX(MapForeground.imageOffsetX - velocity);
      MovablesController.move((movable) => {
        movable.setX(movable.getX() - velocity);
      });
    }
  }
}
