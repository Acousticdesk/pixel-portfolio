import { Keyboard } from "../keyboard";
import { Map } from "../map";
import { PLAYER_ENUMS } from "../player/enums";

export class MovementController {
  static move() {
    const velocity = PLAYER_ENUMS.MOVEMENT_VELOCITY;

    if (Keyboard.keys.w.pressed) {
      Map.setImageOffsetY(Map.imageOffsetY + velocity);
    }
    if (Keyboard.keys.s.pressed) {
      Map.setImageOffsetY(Map.imageOffsetY - velocity);
    }
    if (Keyboard.keys.a.pressed) {
      Map.setImageOffsetX(Map.imageOffsetX + velocity);
    }
    if (Keyboard.keys.d.pressed) {
      Map.setImageOffsetX(Map.imageOffsetX - velocity);
    }
  }
}
