import { Movable, MovableCollection } from "./interfaces";

export class MovablesController {
  private static collections: MovableCollection[] = [];
  static registerCollection(collection: MovableCollection) {
    MovablesController.collections.push(collection);
  }
  static move(navigate: (movable: Movable) => void) {
    MovablesController.collections.forEach((collection) => {
      collection.getItems().forEach((movable) => {
        navigate(movable);
      });
    });
  }
}
