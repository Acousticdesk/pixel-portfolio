import { Canvas } from "./canvas";
import { Map } from "./map";
import { Player } from "./player";

function animate() {
  Map.draw();
  Player.draw();
  window.requestAnimationFrame(animate);
}

export async function main() {
  Canvas.init();
  await Map.init();
  Player.init();
  animate();
}
