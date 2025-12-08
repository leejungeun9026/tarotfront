import type { ResponseDTO } from "@/apis/response";

export type ResponseBody<T> = T | ResponseDTO | null;