export class Keyboard {
  static keys: { [key: string]: { pressed: boolean } } = {
    KeyW: {
      pressed: false,
    },
    KeyA: {
      pressed: false,
    },
    KeyS: {
      pressed: false,
    },
    KeyD: {
      pressed: false,
    },
    Space: {
      pressed: false,
    },
  };
  static lastPressed: string | null = null;
  static handleKeyUp = function handleKeyUp(e: KeyboardEvent) {
    if (Keyboard.keys[e.code]) {
      Keyboard.keys[e.code].pressed = false;
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
    if (Keyboard.keys[e.code]) {
      Keyboard.keys[e.code].pressed = true;
    }
    Keyboard.lastPressed = e.code;
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
