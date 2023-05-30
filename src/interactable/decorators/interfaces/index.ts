import { Movable } from "../../../movables-controller/interfaces";
import { Animatable } from "../../../animatable/interfaces";
import { Drawable } from "../../../drawable/interfaces";
import { Initable } from "../../../initable/interfaces";

// todo akicha 1: probably move the folder one level up
export type InteractableSubject<T, U> = Movable &
  Drawable &
  Animatable &
  Initable<T, U>;
