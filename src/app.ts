import { Canvas } from './canvas'
import { Map } from './map'
import { Player } from './player'

export async function main() {
  Canvas.init();
  await Map.init();
  Player.init();
}
