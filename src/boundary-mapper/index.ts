import { MAP_ENUMS } from "../map/enums";

// todo akicha: name it InteractionTile
export class BoundaryMapper {
  static createBoundaryCoordinates<T>(
    collisions: (0 | MAP_ENUMS.COLLISION_TILE_VALUE)[][],
    {
      createBoundary,
    }: {
      createBoundary: ({
        x,
        y,
        i,
        j,
      }: {
        x: number;
        y: number;
        i: number;
        j: number;
      }) => T;
    }
  ) {
    const boundaryCoordinates = [];
    for (let i = 0; i < collisions.length; i += 1) {
      for (let j = 0; j < collisions[i].length; j += 1) {
        if (collisions[i][j] === MAP_ENUMS.COLLISION_TILE_VALUE) {
          const x =
            j * MAP_ENUMS.TILE_SIZE * (MAP_ENUMS.IMAGE_ZOOM_PERCENTS / 100);
          const y =
            i * MAP_ENUMS.TILE_SIZE * (MAP_ENUMS.IMAGE_ZOOM_PERCENTS / 100);

          boundaryCoordinates.push(
            createBoundary({
              x,
              y,
              i,
              j,
            })
          );
        }
      }
    }
    return boundaryCoordinates;
  }
}
