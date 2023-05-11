export class Keyboard {
  static keys: { [key: string]: { pressed: boolean } } = {
    w: {
      pressed: false,
    },
    a: {
      pressed: false,
    },
    s: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
  };
  static handleKeyUp = function handleKeyUp(e: KeyboardEvent) {
    if (Keyboard.keys[e.key]) {
      Keyboard.keys[e.key].pressed = false;
    }
  };
  static handleKeyDown = function handleKeyDown(e: KeyboardEvent) {
    if (Keyboard.keys[e.key]) {
      Keyboard.keys[e.key].pressed = true;
    }
  };
  static init() {
    document.addEventListener("keyup", Keyboard.handleKeyUp);
    document.addEventListener("keydown", Keyboard.handleKeyDown);
  }
  static remove() {
    document.removeEventListener("keyup", Keyboard.handleKeyUp);
    document.removeEventListener("keydown", Keyboard.handleKeyDown);
  }
}
