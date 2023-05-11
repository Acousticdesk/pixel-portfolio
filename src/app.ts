import { Canvas } from "./canvas";
import { Map } from "./map";
import { Player } from "./player";
import { MovementController } from "./movement-controller";
import { Keyboard } from "./keyboard";

function animate() {
  Canvas.resetCanvas();
  MovementController.move();
  Map.draw();
  Player.draw();
  window.requestAnimationFrame(animate);
}

export async function main() {
  Canvas.init();
  await Map.init();
  Player.init();
  Keyboard.init();
  animate();
}
