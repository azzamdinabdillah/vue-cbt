export interface ToastIF {
  isOpen: boolean;
  message: string;
  status: "success" | "error";
  open: (message: string, status: "success" | "error") => void;
  close: () => void;
}
