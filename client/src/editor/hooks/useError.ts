import { create } from "zustand";
type TErrorMsg = {
  title: string;
  content: string;
};
type TErrorState = {
  isError: boolean;
  errMsg: TErrorMsg;
  raiseError: (error: TErrorMsg) => void;
  cleanError: () => void;
//   errorHistory: TErrorMsg[];
};

export const useError = create<TErrorState>()((set) => ({
  isError: false,
  errMsg: {
    title: "Unknown Error",
    content: "",
  },
  raiseError: (error) =>
    set((state) => ({
      isError: true,
      errMsg: error,
    })),
  cleanError: () =>
    set(() => ({
      isError: false,
      errMsg: {
        title: "Unknown Error",
        content: "",
      },
    })),
//   errorHistory: [],
}));
