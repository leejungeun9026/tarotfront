import { ResponseCode, ResponseMessage } from "@/types/enums";

export default interface ResponseDTO {
  code: ResponseCode;
  message: ResponseMessage;
}