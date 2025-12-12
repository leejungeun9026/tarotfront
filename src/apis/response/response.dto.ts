import { ResponseCode, ResponseMessage } from "@/types/enums";

export default interface ResponseDTO<T> {
  code: ResponseCode;
  message: ResponseMessage;
  data: T | null;
}