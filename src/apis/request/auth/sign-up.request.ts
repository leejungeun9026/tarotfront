export default interface SignUpRequestDTO {
  username: string;
  certificationNum: string;
  password: string;
  name: string;
  agreedTermIds: Array<number>;
}