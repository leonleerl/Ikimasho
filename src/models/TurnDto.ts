import { CardDto } from "./CardDto"

export type Turn = {
    id: number ,
    cards: CardDto[],
    is_correct: false
}