export class Keyboard {
  static handleKeyUp = function handleKeyUp(e: KeyboardEvent) {};
  static handleKeyDown = function handleKeyUp(e: KeyboardEvent) {};
  static init() {
    document.addEventListener("keyup", Keyboard.handleKeyUp);
    document.addEventListener("keydown", Keyboard.handleKeyDown);
  }
  static remove() {
    document.removeEventListener("keyup", Keyboard.handleKeyUp);
    document.removeEventListener("keydown", Keyboard.handleKeyDown);
  }
}
