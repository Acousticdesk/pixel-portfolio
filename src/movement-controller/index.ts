import { Keyboard } from "../keyboard";
import { Map } from "../map";
import { PLAYER_ENUMS } from "../player/enums";
import { BoundaryController } from "../boundary-controller";

export class MovementController {
  static move() {
    const velocity = PLAYER_ENUMS.MOVEMENT_VELOCITY;
    const boundaries = BoundaryController.getBoundaries();

    if (Keyboard.keys.w.pressed) {
      Map.setImageOffsetY(Map.imageOffsetY + velocity);
      boundaries.forEach((boundary) =>
        boundary.setY(boundary.getY() + velocity)
      );
    }
    if (Keyboard.keys.s.pressed) {
      Map.setImageOffsetY(Map.imageOffsetY - velocity);
      boundaries.forEach((boundary) =>
        boundary.setY(boundary.getY() - velocity)
      );
    }
    if (Keyboard.keys.a.pressed) {
      Map.setImageOffsetX(Map.imageOffsetX + velocity);
      boundaries.forEach((boundary) =>
        boundary.setX(boundary.getX() + velocity)
      );
    }
    if (Keyboard.keys.d.pressed) {
      Map.setImageOffsetX(Map.imageOffsetX - velocity);
      boundaries.forEach((boundary) =>
        boundary.setX(boundary.getX() - velocity)
      );
    }
  }
}
