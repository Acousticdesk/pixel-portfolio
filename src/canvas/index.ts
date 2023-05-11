import { CANVAS_ENUMS } from "./enums";

export class Canvas {
  static canvas: HTMLCanvasElement | null = null;
  static ctx: CanvasRenderingContext2D | null = null;

  static init(selector = "#canvas") {
    Canvas.canvas = document.querySelector(selector) as HTMLCanvasElement;
    Canvas.ctx = Canvas.canvas.getContext("2d");

    Canvas.setFullScreenSize();
  }

  // TODO akicha: track window resize event and change the size accordingly
  private static setFullScreenSize() {
    if (!Canvas.canvas) {
      return false;
    }

    Canvas.canvas.width = window.innerWidth;
    Canvas.canvas.height = window.innerHeight;

    return true;
  }

  static getCtx() {
    if (!this.ctx) {
      throw new Error(
        "Canvas was never initialized. Please call Canvas.init() first."
      );
    }
    return this.ctx;
  }

  static getCanvas() {
    if (!this.canvas) {
      throw new Error(
        "Canvas was never initialized. Please call Canvas.init() first."
      );
    }
    return this.canvas;
  }

  static resetCanvas() {
    const ctx = Canvas.getCtx();
    const canvas = Canvas.getCanvas();
    ctx.fillStyle = CANVAS_ENUMS.BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
