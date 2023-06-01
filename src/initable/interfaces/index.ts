export interface Initable<T, U> {
  init: (parameters: T) => U;
}
