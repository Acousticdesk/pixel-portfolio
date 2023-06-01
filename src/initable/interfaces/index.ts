//todo akicha 1: should add generics
export interface Initable<T, U> {
  init: (parameters: T) => U;
}
