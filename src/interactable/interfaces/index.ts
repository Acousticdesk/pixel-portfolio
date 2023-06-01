import { Movable } from "../../movables-controller/interfaces";
import { Animatable } from "../../animatable/interfaces";
import { Drawable } from "../../drawable/interfaces";
import { Initable } from "../../initable/interfaces";

export type InteractableSubject<T, U> = Movable &
  Drawable &
  Animatable &
  Initable<T, U>;
