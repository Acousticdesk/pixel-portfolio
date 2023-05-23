export interface Companion {
  getDialogAreaId: () => number;
  allowToTalkTo: () => void;
  restrictToTalkTo: () => void;
}
