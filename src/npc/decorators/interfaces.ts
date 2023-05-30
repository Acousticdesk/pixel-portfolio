import { NPC } from "../interfaces";
import { Movable } from "../../movables-controller/interfaces";
import { Animatable } from "../../animatable/interfaces";
import { Drawable } from "../../drawable/interfaces";

// todo akicha: NPC across the project to Npc
export type CompanionNpc = NPC & Movable & Animatable & Drawable;
