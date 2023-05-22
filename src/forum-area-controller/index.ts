import { Boundary } from "../boundary";

export class ForumAreaController {
  static forumAreas: Boundary[];

  static init(forumAreas: { x: number; y: number }[]) {
    ForumAreaController.forumAreas = forumAreas.map(
      // @ts-ignore
      (forumArea) => new Boundary(forumArea)
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
