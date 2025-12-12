import type { AxiosResponse } from "axios";
import type { ResponseDTO } from "./response";


export const responseHandler = <T>(response: AxiosResponse<any, any>) => {
  const responseBody: T = response.data;
  return responseBody;
};


export const customResponseHandler = <T>(response: AxiosResponse<T>): T => {
  return response.data;
};


export const errorHandler = (error: any): ResponseDTO | null => {
  if (!error.response || !error.response.data) return null;
  const responseBody: ResponseDTO = error.response.data;
  return responseBody;
};
