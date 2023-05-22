import { MAP_ENUMS } from "../map/enums";

// todo akicha: create one for all types of area detection
export class BoundaryMapper {
  static createBoundaryCoordinates(
    collisions: (0 | MAP_ENUMS.COLLISION_TILE_VALUE)[][]
  ) {
    const boundaryCoordinates = [];
    for (let i = 0; i < collisions.length; i += 1) {
      for (let j = 0; j < collisions[i].length; j += 1) {
        if (collisions[i][j] === MAP_ENUMS.COLLISION_TILE_VALUE) {
          boundaryCoordinates.push({
            x: j * MAP_ENUMS.TILE_SIZE * (MAP_ENUMS.IMAGE_ZOOM_PERCENTS / 100),
            y: i * MAP_ENUMS.TILE_SIZE * (MAP_ENUMS.IMAGE_ZOOM_PERCENTS / 100),
            // todo akicha: to be applied only to forum area
            value: collisions[i][j],
          });
        }
      }
    }
    return boundaryCoordinates;
  }
}
