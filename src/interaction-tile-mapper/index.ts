import { MAP_ENUMS } from "../map/enums";

// todo akicha: name it InteractionTile
export class InteractionTileMapper {
  static createInteractionTileCoordinates<T>(
    collisions: (0 | MAP_ENUMS.COLLISION_TILE_VALUE)[][],
    {
      createInteractionTile,
    }: {
      createInteractionTile: ({
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
    const interactionTileCoordinates = [];
    for (let i = 0; i < collisions.length; i += 1) {
      for (let j = 0; j < collisions[i].length; j += 1) {
        if (collisions[i][j] === MAP_ENUMS.COLLISION_TILE_VALUE) {
          const x =
            j * MAP_ENUMS.TILE_SIZE * (MAP_ENUMS.IMAGE_ZOOM_PERCENTS / 100);
          const y =
            i * MAP_ENUMS.TILE_SIZE * (MAP_ENUMS.IMAGE_ZOOM_PERCENTS / 100);

          interactionTileCoordinates.push(
            createInteractionTile({
              x,
              y,
              i,
              j,
            })
          );
        }
      }
    }
    return interactionTileCoordinates;
  }
}
