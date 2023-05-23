import { DialogArea } from "../dialog-area";

export class ForumAreaController {
  static forumAreas: DialogArea[];

  static init(forumAreas: { x: number; y: number; value: number }[]) {
    ForumAreaController.forumAreas = forumAreas.map(
      (forumArea) => new DialogArea(forumArea)
    );
  }

  static draw() {
    ForumAreaController.getForumAreas().forEach((forumArea) => {
      forumArea.draw();
    });
  }

  static getForumAreas() {
    return this.forumAreas;
  }
}
