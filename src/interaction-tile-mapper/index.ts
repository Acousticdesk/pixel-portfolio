import { MAP_ENUMS } from "../map/enums";

export class InteractionTileMapper {
  static createInteractionTileCoordinates<T>(
    collisions: number[][],
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
        // todo akicha 1: probably allow any non-zero values
        if (
          [
            MAP_ENUMS.COLLISION_TILE_VALUE,
            MAP_ENUMS.MAP_1_NPC_1_INTERACTION_TILE_VALUE,
            MAP_ENUMS.MAP_1_COMPUTER_1_INTERACTION_TILE_VALUE,
            MAP_ENUMS.MAP_1_COMPUTER_2_INTERACTION_TILE_VALUE,
          ].includes(collisions[i][j])
        ) {
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
