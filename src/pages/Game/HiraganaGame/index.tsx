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
    const [currentSelectedId, setCurrentSelectedId] = useState<number|null>(null);
    // const [selectedCard, setSelectedCard] = useState<CardDto>();
    const [currentCards, setCurrentCards] = useState<CardDto[] | null>(null);
    const [currentRound, setCurrentRound] = useState<RoundDto | null>(null);
    const [wholeRound, setWholeRound] = useState<WholeRoundsDto | null>(null)
    const cardList = useSelector((state: RootState) => state.card.cardList);
    const [confirmButtonVisible, setConfirmButtonVisible] = useState<boolean>(true);
    const [finishButtonVisible, setFinishButtonVisible] = useState<boolean>(false);
    const [accuracyVisible, setAccuracyVisible] = useState<boolean>(false);

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
        setCurrentSelectedId(id);
    }

    const onFinishClick = ()=>{

    }

    const onConfirmClick = () =>{
        console.log("onConfirmClick")
        setCurrentSelectedId(null);
        if (currentRound){
            if (currentRound.question_card.id === currentSelectedId) {
                currentRound.is_correct = true
            }
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
        if (wholeRound?.rounds.length == 9){
            setConfirmButtonVisible(false);
            setFinishButtonVisible(true);
            setAccuracyVisible(true);
        }
    }

    return <>
    <div>
        当前轮数：{wholeRound?.rounds.length ? wholeRound?.rounds.length+1 : 1}/10
    </div>
    <div>
        正确率：{wholeRound?.rounds.filter(round => round.is_correct).length} / 10
    </div>
    <div className="flex justify-center items-center p-4">
        <div className="flex-shrink-0 mx-20">
            <Card card={currentRound?.question_card || defaultCard} is_selected={false}/>
        </div>
        <div className="flex flex-col space-y-4">
            <ul>
                {currentRound?.answer_cards.map(card => 
                    <li key={card.id} onClick={()=>onCardClick(card.id)}>
                        <Card card={card} is_selected={card.id === currentSelectedId}/>
                    </li>)}
            </ul>
        </div>
        <div className="flex-shrink-0 mx-20">
            <button className=
            { confirmButtonVisible ? 
            "bg-green-400 shadow-2xl rounded-3xl text-lg p-2 hover:text-white" :
            "bg-green-400 shadow-2xl rounded-3xl text-lg p-2 hover:text-white invisible"
            }
            onClick={()=>onConfirmClick()}>Confirm</button>
            <button className=
            {
                finishButtonVisible?
            "bg-red-500 shadow-2xl rounded-3xl text-lg p-2 hover:text-white ml-4" :
            "bg-red-500 shadow-2xl rounded-3xl text-lg p-2 hover:text-white ml-4 invisible"
            }
             onClick={()=>onFinishClick()}>Finish</button>
                   
        </div>
    </div>
    </>
}


export default HiraganaGame;