import { Boundary } from "../boundary";

export class BoundaryController {
  static boundaries: Boundary[];

  static init(boundaries: { x: number; y: number }[]) {
    BoundaryController.boundaries = boundaries.map(
      (boundary) => new Boundary(boundary)
    );
  }

  static draw() {
    BoundaryController.getBoundaries().forEach((boundary) => {
      boundary.draw();
    });
  }

  static getBoundaries() {
    return this.boundaries;
  }
}
