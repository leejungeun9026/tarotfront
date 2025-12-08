import type ResponseDTO from "../response.dto";

export default interface SignInResponseDTO extends ResponseDTO {
  id: string;
  username: string;
  name: string;
  role: string;
  token: string;
  expirationTime: number;
}