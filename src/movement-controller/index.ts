import { Keyboard } from "../keyboard";
import { Map } from "../map";
import { MapForeground } from "../map-foreground";
import { PLAYER_ENUMS } from "../player/enums";
import { PlayerBoundaryCollisionController } from "../player-boundary-collision-controller";
import { Player } from "../player";
import { MovablesController } from "../movables-controller";

export class MovementController {
  static updatePlayerDirection() {
    if (Keyboard.keys.w.pressed) {
      Player.setMovementDirection(PLAYER_ENUMS.MOVEMENT_DIRECTION_UP);
      Player.startMoving();
      return;
    }

    if (Keyboard.keys.s.pressed) {
      Player.setMovementDirection(PLAYER_ENUMS.MOVEMENT_DIRECTION_DOWN);
      Player.startMoving();
      return;
    }

    if (Keyboard.keys.a.pressed) {
      Player.setMovementDirection(PLAYER_ENUMS.MOVEMENT_DIRECTION_LEFT);
      Player.startMoving();
      return;
    }

    if (Keyboard.keys.d.pressed) {
      Player.setMovementDirection(PLAYER_ENUMS.MOVEMENT_DIRECTION_RIGHT);
      Player.startMoving();
      return;
    }
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
