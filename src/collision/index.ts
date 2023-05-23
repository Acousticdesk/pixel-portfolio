export class Collision {
  static rectangularCollision(
    box1: { x: number; y: number; width: number; height: number },
    box2: { x: number; y: number; width: number; height: number }
  ) {
    return (
      box1.x + box1.width >= box2.x &&
      box1.x <= box2.x + box2.width &&
      box1.y <= box2.y + box2.height &&
      box1.y + box1.height >= box2.y
    );
  }
}
