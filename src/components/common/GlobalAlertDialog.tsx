import { useGlobalDialog } from "@/stores/useGlobalAlertDialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function GlobalAlertDialog() {
  const { open, title, description, confirmText, cancelText, onConfirm, closeDialog } =
    useGlobalDialog();
  return (
    <AlertDialog open={open} onOpenChange={closeDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {cancelText &&
            <AlertDialogCancel className="cursor-pointer">{cancelText}</AlertDialogCancel>
          }
          <AlertDialogAction className="cursor-pointer"
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
  )
}