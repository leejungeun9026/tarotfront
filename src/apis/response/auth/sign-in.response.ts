export default interface SignInResponseDTO {
  id: number;
  username: string;
  name: string;
  role: string;
  token: string;
  expirationTime: number;
}
