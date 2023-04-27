import { create } from "zustand";
type TAlertStyle = {
  align: "flex-start" | "center" | "flex-end";
  input: boolean;
  inputMatch: string;
  inputPlaceholder: string;
  inputNotEmpty: boolean;
  btn_1: string;
  btn_1Loading: boolean;
  btn_2: string;
  btn_2Loading: boolean;
};
interface alertState {
  isAlert: boolean;
  alertStyle: TAlertStyle;
  alertType: "normal";
  setIsAlert: (by: boolean) => void;
  cleanAlert: () => void;
  alertMsg: string | JSX.Element;
  callbackFunction: (response: boolean, inputValue?: string) => void;
  createAlert: (
    alertMsg: string | JSX.Element,
    callback: (response: boolean, inputValue?: string) => void,
    alertStyle?: Partial<TAlertStyle>
  ) => void;
}
export const useAlert = create<alertState>()((set) => ({
  isAlert: false,
  alertStyle: {
    align: "flex-start",
    input: false,
    inputMatch: "",
    inputPlaceholder: "",
    inputNotEmpty: false,
    btn_1: "아니요",
    btn_1Loading: false,
    btn_2: "네",
    btn_2Loading: false,
  },
  setIsAlert: (by) => set((state) => ({ isAlert: by })),
  cleanAlert: () =>
    set((state) => ({
      isAlert: false,
      alertType: "normal",
      alertMsg: "",
      alertStyle: {
        align: "flex-start",
        input: false,
        inputMatch: "",
        inputPlaceholder: "",
        inputNotEmpty: false,
        btn_1: "아니요",
        btn_1Loading: false,
        btn_2: "네",
        btn_2Loading: false,
      },
      callbackFunction: () => {},
    })),
  alertType: "normal",
  alertMsg: "",
  callbackFunction: () => {},
  createAlert: (alertMsg, callback, alertStyle) =>
    set((state) => ({
      isAlert: true,
      alertMsg: alertMsg,
      callbackFunction: callback,
      alertStyle: { ...state.alertStyle, ...alertStyle },
    })),
}));
