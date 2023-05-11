import { Canvas } from './canvas'
import { Map } from './map'

export function main() {
  Canvas.init();
  Map.setCtx(Canvas.getCtx());
  Map.init();
}
