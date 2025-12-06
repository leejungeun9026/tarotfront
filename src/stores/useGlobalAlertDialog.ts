import { create } from "zustand";

type DialogOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string | null;
  onConfirm?: () => void;
};

interface DialogState extends DialogOptions {
  open: boolean;
  showDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
}

export const useGlobalDialog = create<DialogState>((set) => ({
  open: false,
  title: "제목",
  description: "설명",
  confirmText: "확인",
  cancelText: "취소",
  onConfirm: undefined,

  showDialog: (options) =>
    set({
      open: true,
      ...options
    }),

  closeDialog: () => set({ open: false })
}));