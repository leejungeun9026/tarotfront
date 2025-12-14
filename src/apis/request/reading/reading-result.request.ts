import type ReadingCardsRequestDTO from "./reading-cards.request";

export default interface ReadingResultRequestDTO {
  categoryId: number;
  category: string;
  questionText: string;
  spreadType: string;
  spreadCount: number;
  cardList: ReadingCardsRequestDTO[];
}
