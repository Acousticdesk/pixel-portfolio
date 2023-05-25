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
  static lastPressed: string | null = null;
  static handleKeyUp = function handleKeyUp(e: KeyboardEvent) {
    if (Keyboard.keys[e.key]) {
      Keyboard.keys[e.key].pressed = false;
    }

    for (let objKey in Keyboard.keys) {
      const key = Keyboard.keys[objKey];
      if (key.pressed) {
        Keyboard.lastPressed = objKey;
        return;
      }
    }

    Keyboard.lastPressed = null;
  };
  static handleKeyDown = function handleKeyDown(e: KeyboardEvent) {
    if (Keyboard.keys[e.key]) {
      Keyboard.keys[e.key].pressed = true;
    }
    Keyboard.lastPressed = e.key;
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
