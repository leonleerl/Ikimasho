import Card from "@/components/Card";
import { RoundDto, WholeRoundsDto } from "@/models/RoundDto";
import { AppDispatch, RootState } from "@/store";
import { getCardList } from "@/store/modules/cardStore";
import { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import _, { uniqueId } from "lodash";
import { CardDto } from "@/models/CardDto";

const defaultCard: CardDto = {
    id: 0,
    is_selected: false,
    name_hiragana: '',
    name_katakana: '',
    name_romaji: '',
    audio_play: ''
};


const HiraganaGame = () => {
    const dispatch : AppDispatch = useDispatch();
    const [currentSelected, setCurrentSelected] = useState<number|null>(null);
    // const [selectedCard, setSelectedCard] = useState<CardDto>();
    const [currentCards, setCurrentCards] = useState<CardDto[] | null>(null);
    const [currentRound, setCurrentRound] = useState<RoundDto | null>(null);
    const [wholeRound, setWholeRound] = useState<WholeRoundsDto | null>(null)
    const cardList = useSelector((state: RootState) => state.card.cardList);

    // 获取cards列表
    useEffect(()=>{
        dispatch(getCardList());
    }, [dispatch])

    useEffect(()=>{
        const selectedCards = _.sampleSize(cardList, 5);
        const questionCard = _.sample(selectedCards);
        setCurrentCards(selectedCards);
        setCurrentRound({
            id:uniqueId(),
            question_card: questionCard!,
            answer_cards:selectedCards,
            is_correct:false
        })
        
    }, [])


    // useEffect(()=>{
    //     if (currentSelected !== null) {
    //         const res = cardList.find(card => card.id === currentSelected);
    //         setSelectedCard(res);
            
    //       }
    // }, [currentSelected])

    if (cardList.length === 0){
        return <div>Loading...</div>
    }


    const onCardClick = (id:number) =>{
        setCurrentSelected(id);
    }

    const onConfirmClick = () =>{
        console.log("onConfirmClick")
        
        if (currentRound){
            const newWholeRound : WholeRoundsDto = {
                id: uniqueId(),
                rounds: wholeRound ? [...wholeRound.rounds, currentRound] : [currentRound]
            }
            setWholeRound(newWholeRound);
            

            const selectedCards = _.sampleSize(cardList, 5);
            const questionCard = _.sample(selectedCards);
            setCurrentCards(selectedCards);
            setCurrentRound({
                id:uniqueId(),
                question_card: questionCard!,
                answer_cards:selectedCards,
                is_correct:false
            })
        }
    }

    return <>
    <div className="flex justify-center items-center p-4">
        <div className="flex-shrink-0 mx-20">
            <Card card={currentRound?.question_card || defaultCard} is_selected={false}/>
        </div>
        <div className="flex flex-col space-y-4">
            <ul>
                {currentRound?.answer_cards.map(card => 
                    <li key={card.id} onClick={()=>onCardClick(card.id)}>
                        <Card card={card} is_selected={card.id === currentSelected}/>
                    </li>)}
            </ul>
        </div>
        <div className="flex-shrink-0 mx-20">
            <button className="bg-green-400 shadow-2xl rounded-3xl text-lg p-2 hover:text-white" onClick={()=>onConfirmClick()}>Confirm</button>
        </div>
    </div>
    </>
}


export default HiraganaGame;