
export default interface SignInResponseDTO {
  id: string;
  username: string;
  name: string;
  role: string;
  token: string;
  expirationTime: number;
}