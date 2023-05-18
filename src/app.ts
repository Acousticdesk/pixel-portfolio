import { Canvas } from "./canvas";
import { Map } from "./map";
import { Player } from "./player";
import { MovementController } from "./movement-controller";
import { Keyboard } from "./keyboard";
import { collisions } from "./collisions";
import { BoundaryMapper } from "./boundary-mapper";
import { BoundaryController } from "./boundary-controller";

function animate() {
  Canvas.resetCanvas();
  MovementController.move();
  Map.draw();
  BoundaryController.draw();
  Player.draw();
  window.requestAnimationFrame(animate);
}

export async function main() {
  BoundaryController.init(BoundaryMapper.createBoundaryCoordinates(collisions));

  Canvas.init();
  await Map.init();
  await Player.init();
  Keyboard.init();
  animate();
}
