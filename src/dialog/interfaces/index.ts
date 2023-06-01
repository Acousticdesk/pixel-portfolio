export interface DialogImplementation<T> {
  init: () => void;
  handleDialogShow: (content: T) => void;
  handleDialogHide: () => void;
}
