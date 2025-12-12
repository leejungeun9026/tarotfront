import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useGlobalAlertDialog } from "@/stores/useGlobalAlertDialog";
import { useEffect } from "react";

export default function GlobalAlertDialog() {
  const {
    open,
    title,
    description,
    confirmText,
    cancelText,
    onConfirm,
    closeDialog,
  } = useGlobalAlertDialog();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onConfirm?.();
        closeDialog();
      }

      if (e.key === "Escape") {
        closeDialog();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onConfirm, closeDialog]);

  return (
    <AlertDialog open={open} onOpenChange={closeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {cancelText && (
            <AlertDialogCancel className="cursor-pointer">
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            className="cursor-pointer"
            onClick={() => {
              onConfirm?.();
              closeDialog();
            }}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
