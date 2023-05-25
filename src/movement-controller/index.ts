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
      [key: string]:
        | PLAYER_ENUMS.MOVEMENT_DIRECTION_UP
        | PLAYER_ENUMS.MOVEMENT_DIRECTION_DOWN
        | PLAYER_ENUMS.MOVEMENT_DIRECTION_LEFT
        | PLAYER_ENUMS.MOVEMENT_DIRECTION_RIGHT;
    } = {
      w: PLAYER_ENUMS.MOVEMENT_DIRECTION_UP,
      s: PLAYER_ENUMS.MOVEMENT_DIRECTION_DOWN,
      a: PLAYER_ENUMS.MOVEMENT_DIRECTION_LEFT,
      d: PLAYER_ENUMS.MOVEMENT_DIRECTION_RIGHT,
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
      Keyboard.keys.w.pressed &&
      !PlayerBoundaryCollisionController.isCollisionDetected([0, -velocity])
    ) {
      Map.setImageOffsetY(Map.imageOffsetY + velocity);
      MapForeground.setImageOffsetY(MapForeground.imageOffsetY + velocity);
      MovablesController.move((movable) => {
        movable.setY(movable.getY() + velocity);
      });
    }
    if (
      Keyboard.keys.s.pressed &&
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
      Keyboard.keys.a.pressed &&
      !PlayerBoundaryCollisionController.isCollisionDetected([-velocity, 0])
    ) {
      Map.setImageOffsetX(Map.imageOffsetX + velocity);
      MapForeground.setImageOffsetX(MapForeground.imageOffsetX + velocity);
      MovablesController.move((movable) => {
        movable.setX(movable.getX() + velocity);
      });
    }
    if (
      Keyboard.keys.d.pressed &&
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
