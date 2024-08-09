import { CardDto } from "./CardDto"

export type RoundDto = {
    id: number ,
    question_card: CardDto,
    answer_cards: CardDto[],
    is_correct: false
}