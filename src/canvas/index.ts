export class Canvas {
  static canvas: HTMLCanvasElement | null = null;
  static ctx: CanvasRenderingContext2D | null = null;
  
  static init(selector = '#canvas') {
    Canvas.canvas = document.querySelector(selector) as HTMLCanvasElement;
    Canvas.ctx = Canvas.canvas.getContext('2d');
    
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
}
