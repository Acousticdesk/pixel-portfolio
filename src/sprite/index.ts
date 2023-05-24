export class Sprite {
  private readonly src: string;
  private image!: HTMLImageElement;
  constructor(src: string) {
    this.src = src;
  }
  init() {
    return new Promise<void>((resolve, reject) => {
      const image = new Image();
      image.src = this.src;
      this.image = image;
      image.onload = function handleImageLoaded() {
        resolve();
      };
      image.onerror = reject;
    });
  }

  getImage() {
    return this.image;
  }
}
