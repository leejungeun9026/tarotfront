export default interface ReadingCardsRequestDTO {
  position: number;
  positionName: string;
  cardId: number;
  nameEn: string;
  nameKr: string;
  reverse: boolean;
  reverseText: string;
  description: string;
  keyword: string;
  reverseKeyword: string;
}
