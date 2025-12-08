import type { TermsResponseDTO } from "@/apis/response/terms";

export default interface SignUpRequestDTO {
  username: string;
  certificationNum: string;
  password: string;
  name: string;
  agreedTermIds: Array<number>;
}

export type TermsWithChecked = TermsResponseDTO & {
  checked?: boolean; // 선택 여부
};
