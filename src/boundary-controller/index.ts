import { Boundary } from "../boundary";

export class BoundaryController {
  static boundaries: { x: number; y: number }[];

  static init(boundaries: { x: number; y: number }[]) {
    BoundaryController.boundaries = boundaries;
  }

  static draw() {
    BoundaryController.boundaries.forEach((boundary) => {
      Boundary.draw(boundary);
    });
  }
}
