// apis/error-handler.ts
import { useGlobalAlertDialog } from "@/stores/useGlobalAlertDialog";
import type { ResponseCode } from "@/types/enums";
import { getApiErrorMessage } from "@/utils/apiErrorMessage";
import type { BaseResponseDTO } from "./response";

type ErrorLike =
  | BaseResponseDTO      // { code, message, data:null } 형태
  | { code?: ResponseCode } // 코드만 던지고 싶은 경우
  | null
  | undefined;


export const handleApiError = (err: ErrorLike) => {
  const { showDialog } = useGlobalAlertDialog.getState();
  const { title, description } = getApiErrorMessage(err?.code);

  showDialog({
    title,
    description,
    confirmText: "확인",
  });
};
