import { CardDto } from "./CardDto"

export type RoundDto = {
    id: string ,
    question_card: CardDto,
    answer_cards: CardDto[],
    is_correct: false
}

export type WholeRoundsDto = {
    di: string,
    rounds: RoundDto[]
}