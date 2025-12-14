export default interface UserMeResponseDTO {
  id: number;
  username: string;
  name: string;
  role: string;
  provider: string | null;
}
